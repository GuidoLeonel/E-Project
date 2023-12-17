import { cartsModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import jwt from "jsonwebtoken";
import ticketModel from "../models/ticket.models.js";

const cartCtrl = {};

// ######################## API ########################

// --- Busco un producto por ID ---
cartCtrl.getCartByID = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await cartsModel.findById(id);
    if (cart) {
      res.status(200).send({ respuesta: "OK", mensaje: cart });
    } else {
      res.status(404).send({
        respuesta: "Error en consultar Carrito",
        mensaje: "Carrito no encontrado",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar carrito", mensaje: error });
  }
};

// --- Agrego un producto al carrito ---
cartCtrl.addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartsModel.findById(cid);

    if (cart) {
      const prod = await productModel.findById(pid);
      if (prod) {
        // Busco en la BDD
        const index = cart.products.findIndex((prod) => prod.id_prod === pid);
        //Busco en el carrito
        if (index !== -1) {
          cart.products[index].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }
        const respuesta = await cartsModel.findByIdAndUpdate(cid, cart); // Actualizao informacion del carrito en la BDD
        res.status(200).send({
          respuesta: "Producto agregado correctamente",
          mensaje: respuesta,
        });
      } else {
        res.status(404).send({
          respuesta: "Producto no existente",
          mensaje: "Producto no encontrado",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en agregar producto a carrito",
        mensaje: "Carrito no encontrado",
      });
    }
  } catch (error) {
    res.status(400).send({
      respuesta: "Error al encontrar carrito",
      mensaje: "Cart Not Found",
    });
  }
};

// --- Borro un producto del carrito ---
cartCtrl.deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartsModel.findById(cid);
    if (cart) {
      const index = cart.products.findIndex((prod) => prod.id_prod._id == pid);
      if (index != -1) {
        cart.products.splice(index, 1);
        const response = await cartsModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({
          respuesta: "Producto eliminado de carrito",
          mensaje: response,
        });
      } else {
        res.status(404).send({ respuesta: "No se encontró dicho producto" });
      }
    }
  } catch (error) {
    res.status(400).send({
      respuesta: "Ocurrió un error tratando de borrar un producto del carrito",
    });
  }
};

// --- Borro el un carrito entero por ID ---
cartCtrl.deleteCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsModel.findById(cid);
  try {
    cart.products = [];
    const response = await cartsModel.findByIdAndUpdate(cid, cart);
    res
      .status(200)
      .send({ respuesta: "Productos Borrados", mensaje: response });
  } catch (error) {
    res.status(400).send({
      respuesta: "Ocurrió un error ",
    });
  }
};

// --- Ingreso y Actualizo varios productos al mismo tiempo en un mismo carrito ---
cartCtrl.addManyProductsToCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsModel.findById(cid);
  try {
    cart.products = [];
    const response = await cartsModel.findByIdAndUpdate(cid, cart);
    res
      .status(200)
      .send({ respuesta: "Productos Borrados", mensaje: response });
  } catch (error) {
    res.status(400).send({
      respuesta: "Ocurrió un error ",
    });
  }
};

// --- Actualizo Cart, si tiene prod se suma quant, sino agrega nuevo prod ---
cartCtrl.addQuantityOrNewProd = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartsModel.findById(cid);
    if (cart) {
      const i = cart.products.findIndex((prod) => prod.id_prod._id == pid);
      if (i != -1) {
        cart.products[i].quantity = quantity;
      } else {
        cart.products.push({ id_prod: pid, quantity: quantity });
      }
    }
    const response = await cartsModel.findByIdAndUpdate(cid, cart);
    res.status(200).send({
      respuesta: "Se agregaron productos al carrito correctamente",
      mensaje: response,
    });
  } catch {
    res.status(400).send({ respuesta: "Hubo un problema", mensaje: error });
  }
};

cartCtrl.purchase = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartsModel.findById(cid);
    let stockProdOnDB; // Update DB stock products
    let prodsWithOutStok = [];
    let findProdAndUpdateStock;
    let prodToDelFromCart;

    if (cart) {
      for (let prods of cart.products) {
        stockProdOnDB = await productModel.findById(prods.id_prod);
        if (stockProdOnDB.stock >= prods.quantity) {
          const updateStockProdsDB = stockProdOnDB.stock - prods.quantity;
          findProdAndUpdateStock = await productModel.findByIdAndUpdate(
            prods.id_prod,
            { $set: { stock: updateStockProdsDB } }
          );
        } else {
          prodsWithOutStok.push(prods.id_prod);
        }
      }
      if (prodsWithOutStok.length > 0) {
        prodToDelFromCart = await cartsModel.findByIdAndUpdate(cid, {
          $pull: { products: { id_prod: { $in: prodsWithOutStok } } },
        });
        res.status(400).send({ response: "No hay suficiente stock" });
      }
      const cartUpdated = await cartsModel.findById(cid);
      res.status(200).send({
        message: "Ready to execute purchase",
        cartUpdated: cartUpdated,
        prodsDeltedFromCart: prodsWithOutStok,
      });
    }
  } catch (error) {
    console.error("Error in purchase:", error);
    res.status(400).send({
      message: "Internal error server executing sell",
      error: error.message,
    });
  }
};

cartCtrl.createTicket = async (req, res) => {
  try {
    const { cid } = req.params;
    const userPurchase = req.cookies.jwtCookie;
    let emailUserPurchase;

    jwt.verify(userPurchase, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("There was an error verifying JWT");
      } else {
        return (emailUserPurchase = decoded);
      }
    });

    const cartPurchase = await cartsModel.findById(cid);
    let totalPriceToTicket = 0;

    if (cartPurchase) {
      let allPrices = [];
      for (let i = 0; i < cartPurchase.products.length; i++) {
        let totalPrice =
          cartPurchase.products[i].id_prod.price *
          cartPurchase.products[i].quantity;

        allPrices.push(totalPrice);
      }

      for (let price of allPrices) {
        totalPriceToTicket += price;
      }

      const newTicket = await ticketModel.create({
        amount: totalPriceToTicket,
        purchaser: emailUserPurchase.user.email,
      });
      res.status(200).send(newTicket);
    }
  } catch {
    res.status(400).send({ Message: "Error en la venta" });
  }
};

// ######################## Views ########################

cartCtrl.renderCarts = async (req, res) => {
  res.render("carts", {
    css: "styles.css",
  });
};

export default cartCtrl;

import { Router } from "express";
import cartCtrl from "../controllers/cart.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";

const cartRouter = Router();

// ######################## Rutas API ########################
// Buscar un carrito por su ID
cartRouter.get("/api/carts/:id", cartCtrl.getCartByID);

// Agregar un producto a un determinado carrito (funcion solo para usuarios)
cartRouter.post(
  "/api/carts/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  cartCtrl.addProductToCart
);

// Quitar un producto del carrito (funcion solo para usuarios)
cartRouter.delete(
  "/api/carts/:cid/products/:pid",
  cartCtrl.deleteProductFromCart
);

// Eliminar un carrito (funcion solo para admin)
cartRouter.delete("/api/carts/:cid", cartCtrl.deleteCart);

// Agregar mas de un producto al carrito
cartRouter.put("/api/carts/:cid", cartCtrl.addManyProductsToCart);

// Modificar la cantidad de un determinado producto de nuestro carrito
cartRouter.put("/api/carts/:cid/products/:pid", cartCtrl.addQuantityOrNewProd);

// Comenzar compra, revision de stock y actualizacion de carrito para generar un ticket
cartRouter.post("/api/carts/:cid/purchase", cartCtrl.purchase);

// Generamos un Ticket de la compra efectuada.
cartRouter.post("/api/carts/:cid/ticket", cartCtrl.createTicket);

// ######################## Rutas Views ########################
cartRouter.get("/static/carts", cartCtrl.renderCarts);

export default cartRouter;

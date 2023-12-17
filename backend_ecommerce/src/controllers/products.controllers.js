import { productModel } from "../models/products.models.js";

const productCtrl = {};

// ######################## API ########################

productCtrl.getAllProdsFromDB = async (req, res) => {
  const { limit } = req.query;
  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ respuesta: "OK", mensaje: prods });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar productos", mensaje: error });
  }
};

// ------ Buscar producto por ID ------
productCtrl.getProdByIDFromDB = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: prod });
    } else {
      res.status(404).send({
        respuesta: "Error en consultar Producto",
        mensaje: "Producto no encontrado",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar producto", mensaje: error });
  }
};

// ------ Creaer producto ------
productCtrl.createProductInDB = async (req, res) => {
  const { title, description, price, stock, code, thumbnail, category } =
    req.body;

  try {
    const sameProd = await productModel.findOne({ code: code });
    console.log(sameProd);
    if (sameProd) {
      return res.status(400).send("This product already exist in Data Base");
    } else {
      const prod = await productModel.create({
        title,
        description,
        price,
        stock,
        code,
        category,
      });

      res.status(200).send({ respuesta: "OK", mensaje: prod });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear producto", mensaje: error });
  }
};

// ------ Actualizar un producto ------
productCtrl.updateProductFromDB = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    stock,
    status,
    code,
    thumbnail,
    category,
  } = req.body;

  try {
    const prod = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      stock,
      code,
      status,
      thumbnail,
      category,
    });
    if (prod) {
      res
        .status(200)
        .send({ respuesta: "OK", mensaje: "Producto Actualizado" });
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar producto",
        mensaje: "Producto no encontrado",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en actualizar un producto", mensaje: error });
  }
};

// ------ Borrar un producto ------
productCtrl.deleteProductFromDB = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findByIdAndDelete(id);
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: "Producto Borrado" });
    } else {
      res.status(404).send({
        respuesta: "Error en borrar producto",
        mensaje: "Producto no encontrado",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en borrar producto", mensaje: error });
  }
};

// ######################## Views ########################

productCtrl.renderAllProducts = async (req, res) => {
  let { limit, page, category, sort } = req.query;
  const limitProd = limit ?? 4;
  const pageProd = page ?? 1;
  const order = sort ?? "asc";
  const cat = category;
  let productsFromDB;
  let productsToShow;
  let nextPage;
  let prevPage;

  if (cat == undefined) {
    productsFromDB = await productModel.paginate(
      {},
      { limit: limitProd, page: pageProd, sort: { price: order } }
    );
    productsToShow = [];
    for (let prod of productsFromDB.docs) {
      let prodRendered = {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        category: prod.category,
        status: prod.status,
        code: prod.code,
        thumbnails: prod.thumbnails,
        id: prod._id,
      };
      productsToShow.push(prodRendered);
    }

    if (!productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = 1;
      nextPage = productsFromDB.nextPage;
    } else if (productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = productsFromDB.prevPage;
      nextPage = productsFromDB.nextPage;
    } else if (!productsFromDB.hasNextPage) {
      nextPage = productsFromDB.totalPages;
      prevPage = productsFromDB.prevPage;
    }
  } else {
    productsFromDB = await productModel.paginate(
      { category: cat },
      { limit: limitProd, page: pageProd, sort: { price: order } }
    );
    productsToShow = [];
    for (let prod of productsFromDB.docs) {
      let prodRendered = {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        category: prod.category,
        status: prod.status,
        code: prod.code,
        thumbnails: prod.thumbnails,
        id: prod._id,
      };
      productsToShow.push(prodRendered);
    }
    if (!productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = 1;
      nextPage = productsFromDB.nextPage;
    } else if (productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = productsFromDB.prevPage;
      nextPage = productsFromDB.nextPage;
    } else if (!productsFromDB.hasNextPage) {
      nextPage = productsFromDB.totalPages;
      prevPage = productsFromDB.prevPage;
    }
  }
  try {
    res.render("home", {
      title: "Tienda Online",
      css: "styles.css",
      cssDos: "homeStyles.css",
      js: "home.js",
      productos: productsToShow,
      next: nextPage,
      prev: prevPage,
    });
  } catch (error) {
    console.log(error);
  }
};

// Renderizador de Formulario Nuevo Producto
productCtrl.renderNewProdForm = (req, res) => {
  res.render("products", {
    css: "styles.css",
    cssDos: "addProductStyles.css",
    title: "Agregar Productos",
  });
};

productCtrl.createProdForm = async (req, res) => {
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;
  const findNewProd = await productModel.findOne({ code: code });
  const errors_msg = [];
  const succes_msg = [];
  if (findNewProd) {
    errors_msg.push({ text: "Producto ya existente en la Base de Datos" });
    res.render("products", {
      css: "styles.css",
      cssDos: "addProductStyles.css",
      errors_msg,
      title: "Agregar Productos",
    });
  } else {
    const newProduct = productModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });
    succes_msg.push({ text: "El producto ha sido creado" });
    res.render("products", {
      css: "styles.css",
      cssDos: "addProductStyles.css",
      succes_msg,
      title: "Agregar Productos",
    });
  }
};

export default productCtrl;

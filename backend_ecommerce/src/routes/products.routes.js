import { Router } from "express";
import productCtrl from "../controllers/products.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";
const productRouter = Router();

// ######################## Rutas API ########################

// Traer todos los productos de la BD
productRouter.get("/api/products", productCtrl.getAllProdsFromDB);

// Traer un producto por su ID
productRouter.get("/api/products/:id", productCtrl.getProdByIDFromDB);

// Crear un producto (funcion solo para admin)
productRouter.post(
  "/api/products",
  passportError("jwt"),
  authorization("admin"),
  productCtrl.createProductInDB
);

// Actualizar un producto de la BD
productRouter.put(
  "/api/products/:id",
  passportError("jwt"),
  authorization("admin"),
  productCtrl.updateProductFromDB
);

// Eliminar un producto de la BD
productRouter.delete("/api/products/:id", productCtrl.deleteProductFromDB);

// ######################## Rutas Views ########################
productRouter.get("/static/home", productCtrl.renderAllProducts);

productRouter.get("/static/new-product", productCtrl.renderNewProdForm);
productRouter.post("/static/new-product", productCtrl.createProdForm);

export default productRouter;

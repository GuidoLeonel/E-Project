import { Router } from "express";
import productCtrl from "../controllers/products.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";
const productRouter = Router();

// ######################## Rutas API ########################
productRouter.get("/api/products", productCtrl.getAllProdsFromDB);
productRouter.get("/api/products/:id", productCtrl.getProdByIDFromDB);
productRouter.post(
  "/api/products",
  passportError("jwt"),
  authorization("admin"),
  productCtrl.createProductInDB
);
productRouter.put(
  "/api/products/:id",
  passportError("jwt"),
  authorization("admin"),
  productCtrl.updateProductFromDB
);
productRouter.delete("/api/products/:id", productCtrl.deleteProductFromDB);

// ######################## Rutas Views ########################
productRouter.get("/static/home", productCtrl.renderAllProducts);

productRouter.get("/static/new-product", productCtrl.renderNewProdForm);
productRouter.post("/static/new-product", productCtrl.createProdForm);

export default productRouter;

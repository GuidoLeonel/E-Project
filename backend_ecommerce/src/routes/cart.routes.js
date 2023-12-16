import { Router } from "express";
import cartCtrl from "../controllers/cart.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";

const cartRouter = Router();

// ######################## Rutas API ########################
cartRouter.get("/api/carts/:id", cartCtrl.getCartByID);
cartRouter.post("/api/carts/", cartCtrl.createNewCart);
cartRouter.post(
  "/api/carts/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  cartCtrl.addProductToCart
);
cartRouter.delete(
  "/api/carts/:cid/products/:pid",
  cartCtrl.deleteProductFromCart
);
cartRouter.delete("/api/carts/:cid", cartCtrl.deleteCart);
cartRouter.put("/api/carts/:cid", cartCtrl.addManyProductsToCart);
cartRouter.put("/api/carts/:cid/products/:pid", cartCtrl.addQuantityOrNewProd);
cartRouter.post("/api/carts/:cid/purchase", cartCtrl.purchase);
cartRouter.post("/api/carts/:cid/ticket", cartCtrl.createTicket);

// ######################## Rutas Views ########################
cartRouter.get("/static/carts", cartCtrl.renderCarts);

export default cartRouter;

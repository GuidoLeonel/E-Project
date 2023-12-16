import { Router } from "express";
import userCtrl from "../controllers/users.controllers.js";

const userRouter = Router();

// ######################## Rutas API ########################
userRouter.get("/api/users", userCtrl.getAllUsersFromDB);
userRouter.get("/api/users/:id", userCtrl.getUserByID);
userRouter.put("api/users/:id", userCtrl.updateUserFromDB);
userRouter.delete("api/users/:id", userCtrl.deleteUserFromDB);

// ######################## Rutas Views ########################
userRouter.get("/static/register", userCtrl.renderRegisterForm);
//userRouter.post("/static/register", userCtrl.signUp);

export default userRouter;

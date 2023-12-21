import { Router } from "express";
import userCtrl from "../controllers/users.controllers.js";

const userRouter = Router();

// ######################## Rutas API ########################

// Ver todos los usuarios existentes (funcion solo para admin)
userRouter.get("/api/users", userCtrl.getAllUsersFromDB);

// Obtener un usuario por su ID (funcion solo para admin)
userRouter.get("/api/users/:id", userCtrl.getUserByID);

// Actualizar informacion de un usuario (funcion solo para admin)
userRouter.put("api/users/:id", userCtrl.updateUserFromDB);

// Eliminar un usuario (funcion solo para admin)
userRouter.delete("api/users/:id", userCtrl.deleteUserFromDB);

// ######################## Rutas Views ########################
userRouter.get("/static/register", userCtrl.renderRegisterForm);
//userRouter.post("/static/register", userCtrl.signUp);

export default userRouter;

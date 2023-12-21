import mailCtrl from "../controllers/mail.controllers.js";
import { Router } from "express";

const mailingRouter = Router();

// -- En desarrollo -- Enviar un email al usuario
mailingRouter.get("/api/mail", mailCtrl.sendMail);

export default mailingRouter;

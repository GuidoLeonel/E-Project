import mailCtrl from "../controllers/mail.controllers.js";
import { Router } from "express";

const mailingRouter = Router();

mailingRouter.get("/api/mail", mailCtrl.sendMail);

export default mailingRouter;

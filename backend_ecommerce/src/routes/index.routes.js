import { Router } from "express";

// --- Rutas ---
import userRouter from "./users.routes.js";
import productRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import sessionRouter from "./session.routes.js";
import viewsRouter from "./views.routes.js";
import mailingRouter from "./mailing.routes.js";

const router = Router();

router.use("/", userRouter);
router.use("/", productRouter);
router.use("/", cartRouter);
router.use("/", sessionRouter);
router.use("/", viewsRouter);
router.use("/", mailingRouter);

export default router;

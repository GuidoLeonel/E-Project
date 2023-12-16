import { Router } from "express";

const viewsRouter = Router();

// Renderizar Chat
viewsRouter.get("/static/chat", (req, res) => {
  res.render("chat", {
    title: "Chat E-Commerce",
    css: "styles.css",
    cssDos: "chatStyles.css",
    js: "chat.js",
  });
});

export default viewsRouter;

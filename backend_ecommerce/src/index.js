import "dotenv/config";
import express from "express";
import { mongoose } from "mongoose";
import { _dirname } from "./path.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { messageModel } from "./models/message.models.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import initializePassport from "./config/passport.js";
import router from "./routes/index.routes.js";
import { addLogger } from "./utils/loggers.js";

// --- Server Config ---
const app = express();
const PORT = 4000;

// --- BDD ---
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD Conectada");
  })
  .catch(() => console.log("Error en la coneccion a la BDD"));

// --- Midlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = app.listen(PORT, () => {
  console.log(`Servidor conectado en Puerto ${PORT}`);
});
app.use(methodOverride("_method"));

initializePassport();
app.use(passport.initialize());
//app.use(passport.session());
app.use(addLogger);
app.get("/debug", (req, res) => {
  req.logger.debug("Hoola ");
  res.send("ola debug");
});
app.get("/info", (req, res) => {
  req.logger.info("Hoola");
  res.send("ola info");
});
app.get("/fatal", (req, res) => {
  req.logger.fatal("Hoola");
  res.send("ola fatal");
});
app.get("/error", (req, res) => {
  req.logger.error("Hoola");
  res.send("ola error");
});
app.get("/warning", (req, res) => {
  req.logger.warning("Hoola");
  res.send("ola warning");
});

// --- Config cookie ---
app.use(cookieParser(process.env.SIGNED_COOKIE)); // La cookie esta firmada

// --- Config session ---
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true, // establezco que la conexion sea mediante la URL
        useUnifiedTopology: true, // manejo de clusters de manera dinamica
      },
      ttl: 120, // Duracion de la sesion en la BDD en segundos
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, // fuerzo que se intente guardar a pesar de no tener modificacion en los datos
    saveUninitialized: false, // fuerzo a guardar la sesion a pesar de no tener ningun dato
  })
);

app.use(flash());

// --- Variables Globales ---
app.use((req, res, next) => {
  res.locals.errors_msg = req.flash("errors_msg");
  next();
});

// --- Rutas ---
app.use("/", router);

//--- Señalo cual va a ser la ruta publica ---
app.use("/static", express.static(path.join(_dirname, "/public")));

// --- Handlebars config ---
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(_dirname, "./views"));

// --- Socket.io server config ---
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("Servidor Socket.io conectado");
  socket.on("mensaje", async (infoMessage) => {
    try {
      let usuario = infoMessage.user;
      let mensaje = infoMessage.newMessage;
      let allMessages = await messageModel.find();

      const modelMessage = await messageModel.create({
        email: usuario,
        message: mensaje,
      });

      allMessages.push(modelMessage);

      socket.emit("todosLosMensajes", allMessages);
    } catch {
      console.log("Error");
    }
  });
});

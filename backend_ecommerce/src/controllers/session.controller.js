//import { userModel } from "../models/users.models.js";
import { generateToken } from "../utils/jwt.js";

const sessionCtrl = {};

// ######################## API ########################

sessionCtrl.signUp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    }
    res.status(200).send({ mensaje: "Usuario registrado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
  }
};

sessionCtrl.signIn = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).send({ resultado: "Usuario Invalido" });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };

    const token = generateToken(req.user);
    //console.log("JWT generado automaticamente:", token);

    res.cookie("jwtCookie", token, {
      maxAge: 43200000, // 12hs en ms de duracion
    });

    res.status(200).send({ payload: req.user });
  } catch (error) {
    res.status(500).send({ mensaje: `Error en al iniciar sesion: ${error}` });
  }
};

sessionCtrl.GithubStrategy = async (req, res) => {
  res.status(200).send({ response: "Usuario registrado" });
};

sessionCtrl.GithubStrategyCallback = async (req, res) => {
  req.session.user = req.user;
  res.status(200).send({ response: "Usuario logueado" });
};

sessionCtrl.logOut = async (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.clearCookie("jwtCookie");
  res.status(200).send({ result: "Usuario deslogeado" });
};

// ######################## Views ########################

sessionCtrl.renderLoginForm = async (req, res) => {
  res.render("login", {
    css: "styles.css",
    cssDos: "login.css",
  });
};

sessionCtrl.signInView = async (req, res) => {
  res.send("Welcome");
};

export default sessionCtrl;

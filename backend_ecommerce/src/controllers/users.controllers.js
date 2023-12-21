import { userModel } from "../models/users.models.js";

const userCtrl = {};

// ######################## API ########################

// --- Obtener todos los usuarios ---
userCtrl.getAllUsersFromDB = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ respuesta: "OK", mensaje: users });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

// --- Obtener un usuario por su ID ---
userCtrl.getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "User not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

// --- Actualizar un usuario ---
userCtrl.updateUserFromDB = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(id, {
      first_name,
      last_name,
      age,
      email,
      password,
    });
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "User not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

// --- Eliminar un usuario ---
userCtrl.deleteUserFromDB = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "User not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

// ######################## Views ########################

userCtrl.renderRegisterForm = async (req, res) => {
  res.render("register", {
    css: "styles.css",
    cssDos: "register.css",
    message: "Usuario ya existia previamente",
  });
};

export default userCtrl;

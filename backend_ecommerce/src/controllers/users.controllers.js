import { userModel } from "../models/users.models.js";

const userCtrl = {};

// ######################## API ########################

userCtrl.getAllUsersFromDB = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ respuesta: "OK", mensaje: users });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

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

//userCtrl.signUp;

export default userCtrl;

/* async (req, res) => {
  const { first_name, last_name, age, email, password, passwordConfirm } =
    req.body;
  const errors_msg = [];
  const succes_msg = [];
  if (password != passwordConfirm) {
    errors_msg.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 8) {
    errors_msg.push({
      text: "La contraseña debe contener al menos 8 caracteres",
    });
  }
  if (errors_msg.length > 0) {
    res.render("register", {
      css: "styles.css",
      cssDos: "register.css",
      errors_msg,
    });
  } else {
    const findUser = await userModel.findOne({ email: email });

    if (findUser) {
      errors_msg.push({
        text: "El correo ya se encuentra en uso",
      });
      res.render("register", {
        css: "styles.css",
        cssDos: "register.css",
        errors_msg,
      });
    } else {
      const userPass = createHash(password);
      const newUser = await userModel.create({
        first_name,
        last_name,
        age,
        email,
        password: userPass,
      });
      succes_msg.push({ text: "Usuario creado correctamente" });
      res.render("login", {
        css: "styles.css",
        cssDos: "login.css",
        succes_msg,
      });
    }
  }
}; */

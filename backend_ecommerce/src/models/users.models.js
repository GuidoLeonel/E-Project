import { Schema, model } from "mongoose";
import { cartsModel } from "./carts.models.js";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
    index: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "user",
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});

//PREvio a que se GUARDE un usuario le asigno su propio carrito
userSchema.pre("save", async function (next) {
  try {
    const newCart = await cartsModel.create({});
    this.cart = newCart._id;
  } catch (error) {
    next(error);
  }
});

export const userModel = model("users", userSchema);

/* // Ciframos la contraseña
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(11);
  return await bcrypt.hash(password, salt);
};

// Comparamos y resolvemos la contraseña de la base de datos
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Parametro 1: nombre de la coleccion
// Parametro 2: Schema */

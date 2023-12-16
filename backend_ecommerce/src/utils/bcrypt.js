import bcrypt from "bcrypt";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

// importante tener en cuenta el orden en el que enviamos a la funcion los parametro de las contrseñas que tiene que comparar
export const validatePassword = (passwordSend, passwordBDD) =>
  bcrypt.compareSync(passwordSend, passwordBDD);

//console.log(validatePassword("coderhose", passwordEnc));

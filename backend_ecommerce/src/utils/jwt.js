import "dotenv/config";
import jwt from "jsonwebtoken";
//process.env.JWT_SECRET
export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  //console.log(token);

  return token;
};

export const authToken = (req, res, next) => {
  //Consulto los headers --> consulto token que viene en headers "Authorization: value"
  const authHeader = req.headers.Authorization;

  if (!authHeader) {
    res.status(401).send({ error: "Usuario no autenticado" });
  }
  const token = authHeader.split(" ")[1]; //obtengo el token y descarto el Bearer

  jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
    if (error) {
      return res.status(403).send({ error: "Usuario no autorizado" });
    }
  });

  // Usuario valido:
  req.user = credential.user;
  next();
};

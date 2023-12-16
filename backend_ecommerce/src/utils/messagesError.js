import passport from "passport";

// --- AUTENTICACION (Revisa existencia de token) ---
// Funcion general para el manejo de errores en las estrategias de passport
export const passportError = (strategy) => {
  // Voy a enviar local, github o jwt
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error); // Que la funcion/estrategia que el usuario llame, maneje como va a responder ante mi error, por eso lleva next.
      }
      if (!user) {
        // Dependiendo de la estrategia envio un objeto o un texto
        return res
          .status(401)
          .send({ error: info.messages ? info.messges : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next); // Esto es porque me va a llamar un middelware a nivel de ruta.
  };
};

//Recibo un rol y establezco la capacidad del usuario
export const authorization = (rol) => {
  // comparo el parametro de "rol" cuando llamo a la funcion en cada ruta
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "Usuario no autorizado" });
    }
    //req.user tiene todos los datos de la sesion con la informacion del usuario
    if (req.user.user.rol != rol) {
      return res
        .status(403)
        .send({ error: "Usuario no tiene los permisos necesarios" });
    }
    next();
  };
};

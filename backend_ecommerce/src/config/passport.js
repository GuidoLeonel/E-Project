import local from "passport-local"; // importo la estrategia
import passport from "passport";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import { userModel } from "../models/users.models.js";

//Defino la estrategia a utilizar
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt; //Extraer de las cookies el token

const initializePassport = () => {
  const cookieExtractor = (req) => {
    //console.log(req.cookies);
    const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {};
    //console.log(token);
    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //CONFIG DE DONDE VIENE EL TOKEN --> viene del cookie extractor
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          //console.log("JWT", jwt_payload);
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register", // nombre de identificacion de estrategia
    new LocalStrategy(
      {
        passReqToCallback: true, //devuelvo la info como un callback
        usernameField: "email",
      },
      async (req, username, password, done) => {
        //Registro de usuario
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: email });
          if (user) {
            //Caso de error, usuario existe
            return done(null, false); // primer parametro es null, debido que "done" recibe como primer parametro el error.
          } else {
            //Crear usuario
            const passwordHash = createHash(password);
            const newUser = await userModel.create({
              first_name: first_name,
              last_name: last_name,
              age: age,
              email: email,
              password: passwordHash,
            });

            return done(null, newUser);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({
            email: username,
          });
          if (!user) {
            return done(null, false);
          }
          if (validatePassword(password, user.password)) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });
          if (user) {
            done(null, false);
          } else {
            const newUser = await userModel.create({
              first_name: profile._json.name,
              last_name: " ",
              email: profile._json.email,
              age: 18,
              password: createHash(profile._json.email),
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Inicializar la session del user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //Eliminar la session
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;

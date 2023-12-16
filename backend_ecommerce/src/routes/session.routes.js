import { Router } from "express";
import sessionCtrl from "../controllers/session.controller.js";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";

const sessionRouter = Router();

// ######################## API ########################
sessionRouter.post(
  "/api/sessions/register",
  passport.authenticate("register"),
  sessionCtrl.signUp
);

sessionRouter.post(
  "/api/sessions/login",
  passport.authenticate("login"),
  sessionCtrl.signIn
);

sessionRouter.get(
  "/api/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  sessionCtrl.GithubStrategy
);

sessionRouter.get(
  "/api/sessions/githubCallback",
  passport.authenticate("github"),
  sessionCtrl.GithubStrategyCallback
);

sessionRouter.get(
  "/api/sessions/testJWT",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

sessionRouter.get(
  "/api/sessions/current",
  passportError("jwt"),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

sessionRouter.get("/api/sessions/logout", sessionCtrl.logOut);

// ######################## Views ########################
sessionRouter.get("/static/login", sessionCtrl.renderLoginForm);
sessionRouter.get("/static/login", sessionCtrl.signInView);

export default sessionRouter;

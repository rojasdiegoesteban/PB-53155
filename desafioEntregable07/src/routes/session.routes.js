import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/register", passportCall("register"), sessionController.register);

router.post("/login", passportCall("login"), sessionController.login);

router.get("/current", passportCall("jwt"), authorization("user"), sessionController.current);

router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false
}), sessionController.loginGoogle);

router.get("/logout", sessionController.logout);

export default router;
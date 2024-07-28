import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { userLoginValidator } from "../validators/userLogin.validator.js";

const router = Router();

router.post("/register", passportCall("register"), sessionController.register);

router.post("/login", passport.authenticate("login"), sessionController.login);

router.post("/jwt", userLoginValidator, sessionController.jwt);

router.get("/current", passportCall("jwt"), authorization("user"), sessionController.current);

router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false
}), sessionController.google);

router.get("/logout", sessionController.logout);

export default router;
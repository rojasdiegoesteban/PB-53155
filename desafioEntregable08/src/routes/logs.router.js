import { Router } from "express";
import { logger } from "../utils/logger.js"

const router = Router();

router.get("/", async (req, res) => {
    logger.log("http", `Mensaje de error, prioridad "http"`);
    logger.log("info", `Mensaje de error, prioridad "info"`);
    logger.log("warn", `Mensaje de error, prioridad "warn"`);
    logger.log("error", `Mensaje de error, prioridad "error"`);

    return res.status(200).json({ status: "success", payload: "Por favor, verifique los mensajes de error en la consola" });
});


export default router;
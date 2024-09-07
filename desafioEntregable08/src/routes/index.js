import { Router } from "express";
import productsRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";
import sessionRouters from "./session.routes.js";
import logRoutes from "./logs.router.js";

const router = Router();

router.use("/products", productsRouters);
router.use("/carts", cartsRouters);
router.use("/session", sessionRouters);
router.use("/loggertest", logRoutes); //ruta para testear logger

export default router;
import { Router } from "express";
import productsController from "../controllers/product.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";

const router = Router();

// lista todos los productos
router.get("/", productsController.getAllProducts);

// Obtiene el producto con el id enviado
router.get("/:pid", productsController.getProductById);

// agrega un nuevo producto
router.post("/", passportCall("jwt"), authorization("admin"), productDataValidator, productsController.createProduct);

// modifica un producto existente
router.put("/:pid", passportCall("jwt"), authorization("admin"), productsController.updateProduct);

// elimina un producto
router.delete("/:pid", passportCall("jwt"), authorization("admin"), productsController.deleteProduct);


export default router;
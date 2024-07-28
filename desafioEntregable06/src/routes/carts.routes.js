import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartsController from "../controllers/cart.controller.js";

const router = Router();

// create cart
router.post("/", passportCall("jwt"), authorization("user"), cartsController.createCart);

// add product to cart
router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.addProductToCart);

// update product quantity from cart
router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.updateQuantityProductInCart);

// delete product in cart
router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.deleteProductInCart);

// delete all products in cart
router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.deleteAllProductsInCart);


export default router;
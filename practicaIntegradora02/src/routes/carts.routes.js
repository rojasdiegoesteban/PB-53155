import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

// create cart
router.post("/", authorization("user"), async (req, res) => {
    try {
        const cart = await cartDao.create();
        res.status(201).json({ status: "success", payload: cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});
// add product to cart
router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartDao.addProductToCart(cid, pid);

        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con id ${pid}` });
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

// update product quantity from cart
router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

// delete product in cart
router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartDao.deleteProductInCart(cid, pid);
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con id ${pid}` });
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

// get cart by id
router.get("/:cid", passportCall("jwt"), authorization("user"), async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);
        if (!cart) res.status(404).json({ status: "Error", msg: `No se encontró el carrito con id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

// update cart by id
router.put("/:cid", passportCall("jwt"), authorization("user"), async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartDao.update(cid, body);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
})

// delete all products in cart
router.delete("/:cid", passportCall("jwt"), authorization("user"), async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartDao.deleteAllProductsInCart(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }

})


export default router;
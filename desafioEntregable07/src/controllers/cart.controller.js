import cartsService from "../services/cart.service.js";
import ticketServices from "../services/ticket.services.js";

// create cart
const createCart = async (req, res) => {
    try {
        const cart = await cartsService.createCart();
        res.status(201).json({ status: "success", payload: cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// add product to cart
const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsService.addProductToCart(cid, pid);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// update product quantity from cart
const updateQuantityProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartsService.updateQuantityProductInCart(cid, pid, quantity);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// delete product in cart
const deleteProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsService.deleteProductInCart(cid, pid);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// get cart by id
const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsService.getCartById(cid);
        if (!cart) res.status(404).json({ status: "Error", msg: `No se encontró el carrito con id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};


// delete all products in cart
const deleteAllProductsInCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartsService.deleteAllProductsInCart(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// purchese cart
const purchaseCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartsService.getCartById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
      // Obtener el total del carrito
      const total = await cartsService.purchaseCart(cid);
      // Crear el ticket
      const ticket = await ticketServices.createTicket(req.user.email, total);
  
      res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  };


export default {
    createCart,
    addProductToCart,
    updateQuantityProductInCart,
    deleteProductInCart,
    getCartById,
    deleteAllProductsInCart,
    purchaseCart
};
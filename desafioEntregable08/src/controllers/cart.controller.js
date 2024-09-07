import cartsService from "../services/cart.service.js";
import ticketServices from "../services/ticket.services.js";

// create cart
const createCart = async (req, res, next) => {
    try {
        const cart = await cartsService.createCart();

        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        next(error);
    }
};

// add product to cart
const addProductToCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsService.addProductToCart(cid, pid);
        
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        next(error);
    }
};

// update product quantity from cart
const updateQuantityProductInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartsService.updateQuantityProductInCart(cid, pid, quantity);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        next(error);
    }
};

// delete product in cart
const deleteProductInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsService.deleteProductInCart(cid, pid);
        
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        next(error);
    }
};

// get cart by id
const getCartById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartsService.getCartById(cid);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        next(error);
    }
};


// delete all products in cart
const deleteAllProductsInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartsService.deleteAllProductsInCart(cid);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        next(error);
    }
};

// purchese cart
const purchaseCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      // verifico que existe el carrito
      const cart = await cartsService.getCartById(cid);
      // Obtener el total del carrito
      const total = await cartsService.purchaseCart(cid);
      // Crear el ticket
      const ticket = await ticketServices.createTicket(req.user.email, total);
  
      res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
      next(error);
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
import cartsRepository from "../persistences/mongo/repositories/cart.repository.js";
import productsRepository from "../persistences/mongo/repositories/product.repository.js";

// create cart
const createCart = async () => {
    return await cartsRepository.create();
};

// add product to cart
const addProductToCart = async (cid, pid) => {
    return await cartsRepository.addProductToCart(cid, pid);
};

// update product quantity from cart
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartsRepository.updateQuantityProductInCart(cid, pid, quantity);
};

// delete product in cart
const deleteProductInCart = async (cid, pid) => {
    return await cartsRepository.deleteProductInCart(cid, pid);
};

// get cart by id
const getCartById = async (cid) => {
    return await cartsRepository.getById(cid);
};

// delete all products in cart
const deleteAllProductsInCart = async (cid) => {
    return await cartsRepository.deleteAllProductsInCart(cid);
};

// purchese cart
const purchaseCart = async (cid) => {
    const cart = await cartsRepository.getById(cid);
    let total = 0;
    const products = [];

    for( const product of cart.products) {
        const prod = await productsRepository.getById(product.product);
        if(prod.stock >= product.quantity) {
          total += prod.price * product.quantity;
        } else {
          products.push(product)
        }
         
        // Modificar los productos del carrito
        await cartsRepository.updateCart(cid, products);
    }

    return total;
}


export default {
    createCart,
    addProductToCart,
    updateQuantityProductInCart,
    deleteProductInCart,
    getCartById,
    deleteAllProductsInCart,
    purchaseCart
};
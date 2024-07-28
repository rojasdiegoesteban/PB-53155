import cartDao from "../dao/mongoDao/cart.dao.js";

// create cart
const createCart = async () => {
    return await cartDao.create();
};

// add product to cart
const addProductToCart = async (cid, pid) => {
    const productInCart = await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });

    if (!productInCart) {
        return await cartDao.update({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
    }
    return productInCart;
};

// update product quantity from cart
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartDao.update({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
};

// delete product in cart
const deleteProductInCart = async (cid, pid) => {
    return await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });
};

// get cart by id
const getCartById = async (cid) => {
    return await cartDao.getById(cid);
};

// delete all products in cart
const deleteAllProductsInCart = async (cid) => {
    return await cartDao.deleteAllProductsInCart(cid);
};


export default {
    createCart,
    addProductToCart,
    updateQuantityProductInCart,
    deleteProductInCart,
    getCartById,
    deleteAllProductsInCart
};
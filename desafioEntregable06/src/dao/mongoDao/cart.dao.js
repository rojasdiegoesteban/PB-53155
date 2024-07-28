import { cartModel } from "../models/cart.model.js";

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const update = async (query, data) => {
  return await cartModel.findOneAndUpdate(query, data);
};

const deleteAllProductsInCart = async (cid) => {
  return await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });

  // const cartUpdate = await cartModel.findById(cid);
  // return cartUpdate;
};


export default {
  getById,
  create,
  update,
  deleteAllProductsInCart
};

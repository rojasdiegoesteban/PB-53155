import productDao from "../dao/mongoDao/product.dao.js";

const getAll = async (query, options) => {
    return await productDao.getAll(query, options);
};

const getById = async (id) => {
    return await productDao.getById(id);
};

const create = async (data) => {
    return await productDao.create(data);
}

const update = async (id, data) => {
    return await productDao.update(id, data);
}

const deleteOne = async (id) => {
    return await productDao.deleteOne(id);
}


export default {
    getAll,
    getById,
    update,
    deleteOne,
    create
  }
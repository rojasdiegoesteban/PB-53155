import productsRepository from "../persistences/mongo/repositories/product.repository.js";
import { productResponseDto } from "../dto/product-response.dto.js";
import { generateProductsMocks } from "../mocks/product.mock.js";
import error from  "../errors/customErrors.js";

const getAll = async (query, options) => {
    const products = await productsRepository.getAll(query, options);
    if (!products) throw error.notFoundError("No se encontraron productos");
    return products;
};

const getById = async (id) => {
    const productData = await productsRepository.getById(id);
    if (!productData) throw error.notFoundError(`Producto con id ${id} no encontrado`);
    const product = productResponseDto(productData);
    return product;
};

const create = async (data) => {
    return await productsRepository.create(data);
};

const update = async (id, data) => {
    const product = await productsRepository.update(id, data);
    if (!product) throw error.notFoundError(`Producto con id ${id} no encontrado`);
    return product;
};

const deleteOne = async (id) => {
    const product = await productsRepository.deleteOne(id);
    if (!product) throw error.notFoundError(`Producto con id ${id} no encontrado`);
    return product;
};

const createMocks = () => {
    return generateProductsMocks(50);
}


export default {
    getAll,
    getById,
    update,
    deleteOne,
    create,
    createMocks
  }
import productsService from "../services/product.service.js";

// get all products
const getAllProducts = async (req, res, next) => {
    try {
        const { limit, page, sort, category, status } = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            lean: true,
        };

        if (status) {
            const products = await productsService.getAll({ status: status }, options);
            return res.status(200).json({ products });
        }

        if (category) {
            const products = await productsService.getAll({ category: category }, options);
            return res.status(200).json({ products });
        }

        const products = await productsService.getAll({}, options);
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// get product by id
const getProductById = async (req, res, next) => {
    try {
        const { pid } = req.params; // Todos los parámetros siempre vienen en formato string
        const product = await productsService.getById(pid);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// create product
const createProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const newProduct = await productsService.create(product);

        res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// update product
const updateProduct = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const updProduct = await productsService.update(pid, productData);

        res.status(201).json({ status: "success", payload: updProduct });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// delete product
const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productsService.deleteOne(pid);

        res.status(200).json({ status: "success", payload: `El producto con id ${pid} fue eliminado` });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// create mocks products
const createProductsMocks = async (req, res, next) => {
    try {
        const newProducts = productsService.createMocks();
        res.status(200).json({ status: "success", payload: newProducts });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductsMocks
};
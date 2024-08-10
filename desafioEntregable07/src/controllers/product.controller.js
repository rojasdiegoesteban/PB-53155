import productsService from "../services/product.service.js";

// get all products
const getAllProducts = async (req, res) => {
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
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// get product by id
const getProductById = async (req, res) => {
    try {
        const { pid } = req.params; // Todos los parámetros siempre vienen en formato string
        const product = await productsService.getById(pid);
        if (!product) res.status(404).json({ status: "Error", msg: `Producto con id ${pid} no encontrado` })

        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// create product
const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productsService.create(product);

        res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// update product
const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const updProduct = await productsService.update(pid, productData);
        if (!updProduct) res.status(404).json({ status: "Error", msg: `Producto con id ${pid} no encontrado` })

        res.status(201).json({ status: "success", payload: updProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

// delete product
const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsService.deleteOne(pid);
        if (!product) res.status(404).json({ status: "Error", msg: `Producto con id ${pid} no encontrado` })

        res.status(200).json({ status: "success", payload: "producto eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};


export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
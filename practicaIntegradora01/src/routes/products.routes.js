import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

// lista todos los productos
router.get("/", async (req, res) => {
  try {
    // const { limit } = req.query;
    const products = await productDao.getAll();

    res.status(200).json({status: "success", payload: products});
  } catch (error) {
    console.error(error);
    res.status(400).json({status: "Error", msg: error.message});
  }
});

// Obtiene el producto con el id enviado
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Todos los parámetros siempre vienen en formato string
    const product = await productDao.getById(pid);
    if (!product) res.status(404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})

    res.status(200).json({status: "success", payload: product});

  } catch (error) {
    console.error(error);
    res.status(400).json({status: "Error", msg: error.message});
  }
});

// agrega un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productDao.create(product);
    res.status(201).json({status: "success", payload: newProduct});

  } catch (error) {
    console.error(error);
    res.status(400).json({status: "Error", msg: error.message});
  }
});

// modifica un producto existente
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    const updProduct = await productDao.update(pid, productData);
    if (!product) res.status(404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})

    res.status(201).json({status: "success", payload: updProduct});

  } catch (error) {
    console.error(error);
    res.status(400).json({status: "Error", msg: error.message});
  }
});

// elimina un producto
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteOne(pid);
    if (!product) res.status(404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})

    res.status(200).json({status: "success", payload: "producto eliminado" });

  } catch (error) {
    console.error(error);
    res.status(400).json({status: "Error", msg: error.message});
  }
});


export default router;
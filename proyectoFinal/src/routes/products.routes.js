import { Router } from "express";
import productManager from "../managers/productManager.js";

const router = Router();

// lista todos los productos
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

// Obtiene el producto con el id enviado
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Todos los parámetros siempre vienen en formato string
    const product = await productManager.getProductById(parseInt(pid));
    res.status(200).json(product);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// agrega un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);

    res.status(201).json(newProduct);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// modifica un producto existente
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updProduct = await productManager.updateProduct(parseInt(pid), product);

    res.status(201).json(updProduct);

  } catch (error) {
    res.status(400).json({ error: error.message });

  }
});

// elimina un producto
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(parseInt(pid));

    res.status(201).json({ message: "producto eliminado" });

  } catch (error) {
    console.log(error);

  }
});


export default router;
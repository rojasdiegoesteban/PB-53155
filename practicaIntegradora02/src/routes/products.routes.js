import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";

const router = Router();

// lista todos los productos
router.get("/", async (req, res) => {
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
      const products = await productDao.getAll({status: status}, options);
      return res.status(200).json({products});
    }

    if (category) {
      const products = await productDao.getAll({category: category}, options);
      return res.status(200).json({products});
    }

    const products = await productDao.getAll({}, options);
    res.status(200).json({status: "success", payload: products});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
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
    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }
});

// agrega un nuevo producto
router.post("/", passportCall("jwt"), authorization("admin"), productDataValidator, async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productDao.create(product);
    res.status(201).json({status: "success", payload: newProduct});

  } catch (error) {
    console.error(error);
    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }
});

// modifica un producto existente
router.put("/:pid", passportCall("jwt"), authorization("admin"), async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    const updProduct = await productDao.update(pid, productData);
    if (!product) res.status(404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})

    res.status(201).json({status: "success", payload: updProduct});

  } catch (error) {
    console.error(error);
    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }
});

// elimina un producto
router.delete("/:pid", passportCall("jwt"), authorization("admin"), async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteOne(pid);
    if (!product) res.status(404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})

    res.status(200).json({status: "success", payload: "producto eliminado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({status: "Error", msg: "Error interno del servidor"});
  }
});


export default router;
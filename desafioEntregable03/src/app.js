import express from "express";
import productManager from "./productManager.js";

//para crear una aplicacion/servidor de express
const app = express();

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params

//para inicializar el servidor
app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Todos los parámetros siempre vienen en formato string
    const product = await productManager.getProductById(parseInt(pid));
    res.status(200).json(product);
    
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

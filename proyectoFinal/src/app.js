import express from "express";
import router from "./routes/index.js";

//para crear una aplicacion/servidor de express
const app = express();

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params

//configuro ruta raiz
app.use("/api", router);

//para inicializar el servidor
app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});


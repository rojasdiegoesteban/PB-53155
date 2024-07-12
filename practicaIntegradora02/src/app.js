import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";

connectMongoDB();


//para crear una aplicacion/servidor de express
const app = express();

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params
app.use(cookieParser("secreto"));
app.use(session({
  store: mongoStore.create({
    mongoUrl: "mongodb+srv://admin:admin1234@e-commerce.2gmymtj.mongodb.net/ecommerce",
    ttl: 15
  }),
  secret: "secretCode",
  resave: true,
  saveUninitialized: true
})) //manejo de sesiones

// para generar las estrategias de autenticación y autorización
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

//configuro ruta raiz
app.use("/api", router);

//para inicializar el servidor
app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});


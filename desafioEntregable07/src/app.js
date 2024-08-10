import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import env from "./config/env.config.js";

connectMongoDB();


//para crear una aplicacion/servidor de express
const app = express();

//para configurar el servidor con determinadas funcionalidades
app.use(express.json()); //para manejar json
app.use(express.urlencoded({ extended: true })); //para leer queries y params
app.use(cookieParser(env.SECRET_CODE));
app.use(session({
  store: mongoStore.create({
    mongoUrl: env.MONGO_URL,
    ttl: 15
  }),
  secret: env.SECRET_CODE,
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
app.listen(env.PORT, () => {
  console.log(`Escuchando el servidor en el puerto ${env.PORT}`);
});


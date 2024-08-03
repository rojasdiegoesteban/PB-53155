import mongoose from "mongoose";
import env from "./env.config.js";

export const connectMongoDB = async () => {
  try {
    // Conexión con la bd
    mongoose.connect(env.MONGO_URL);
    console.log("Mongo DB Conectado");
  } catch (error) {
    console.log(error);
  }
};

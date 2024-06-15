import mongoose from "mongoose";

const urlDb = "mongodb+srv://admin:admin1234@e-commerce.2gmymtj.mongodb.net/ecommerce"


export const connectMongoDB = async () => {
  try {
    // Conexión con la bd
    mongoose.connect(urlDb);
    console.log("Mongo DB Conectado");
  } catch (error) {
    console.log(error);
  }
};

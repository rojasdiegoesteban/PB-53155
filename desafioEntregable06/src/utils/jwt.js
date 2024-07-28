import jwt from "jsonwebtoken";
import env from "../config/env.config.js";

// Crear el token
export const createToken = (user) => {
  const { _id, email, role } = user;
  const token = jwt.sign({ _id, email, role }, env.SECRET_CODE, { expiresIn: "1m" });
  return token;
};

// Verificar el token
export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, env.SECRET_CODE);
    return decode;
  } catch (error) {
    return null;
  }
};

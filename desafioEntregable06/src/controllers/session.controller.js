import userDao from "../dao/mongoDao/user.dao.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { createToken, verifyToken } from "../utils/jwt.js";

const register = async (req, res) => {
    try {
        res.status(201).json({ status: "success", msg: "Usuario creado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        return res.status(200).json({ status: "success", payload: req.user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
};

const jwt = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userDao.getByEmail(email);
        if (!user || !isValidPassword(user, password)) return res.status(401).json({ status: "error", msg: "usuario o contraseña invalido" });

        const token = createToken(user);
        // Guardamos el token en una cookie
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ status: "success", payload: user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
};

const current = async (req, res) => {
    try {

        return res.status(200).json({ status: "success", payload: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
};

const google = async (req, res) => {
    try {
        return res.status(200).json({ status: "success", payload: req.user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ status: "success", msg: "Sesion finalizada con éxito" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
};

export default {
    register,
    login,
    jwt,
    current,
    google,
    logout
};
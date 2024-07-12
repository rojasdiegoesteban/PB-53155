import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtracto = (req) => {
    let token = null;
  
    if (req && req.cookies) {
      token = req.cookies.token;
    }
  
    return token;
  }

const initializePassport = () => {
    // Esta función inicializa las estrategias que configuremos
    // Para passport solo existen estas dos propiedades que puede recibir username y password
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            // done es una función que debemos llamar cuando terminamos de procesar la autenticación.
            // passport recibe dos datos el username y el password, en caso de que no tengamos un campo username en nuestro formulario, podemos usar usernameField para definir el campo que usaremos como username.
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, email, age } = req.body;
                    const user = await userDao.getByEmail(username);
                    if (user) return done(null, false, { message: "El usuario ya existe" });

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        role,
                    }

                    const createUser = await userDao.create(newUser);
                    return done(null, createUser);

                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await userDao.getByEmail(username);
                if (!user || !isValidPassword(user, password)) return done(null, false, { message: "email o password invalidos" });

                // si los datos del usuario son correctos
                return done(null, user);

            } catch (error) {
                done(error);
            }
        })
    );

    passport.use(
        "google",
        new GoogleStrategy(
            {
                clientID: "826352021789-jdk2pm07jnb8droiesvdiamqon0623ba.apps.googleusercontent.com",
                clientSecret: "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",
                callbackURL: "http://localhost:8080/api/session/google"
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {

                    const { name, emails, username } = profile;
                    const user = {
                        first_name: name.givenName,
                        last_name: name.familyName,
                        email: emails[0].value
                    };

                    const existUser = await userDao.getByEmail(emails[0].value);
                    if (existUser) return cb(null, existUser);

                    const newUser = await userDao.create(user);
                    return cb(null, newUser);

                } catch (error) {
                    return cb(error);
                }
            }
        )
    );

    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtracto]),
                secretOrKey: "codigoSecreto",
            },
            async (jwt_payload, done) => {
                try {

                    return done(null, jwt_payload);

                } catch (error) {
                    return done(error);
                }
            }
        ));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userDao.getById(id);
        done(null, user);
    });

};

export default initializePassport;
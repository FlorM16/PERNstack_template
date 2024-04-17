import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => { /*Genera un 'token' cada que alguien se registra */
  const { username, email, password } = req.body;

  try {
    /*hash(): Convierte un string a una serie de caracteres aleatorios*/
    const passwordHash = await bcrypt.hash(password, 10);

    /*Creamos una instancia del model User, y le asignamos los datos del req.body */
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });

    /*save() es un metodo de Sequelize
    Guardamos el registro (que tiene forma de objeto) en la tabla 'users' de la base de datos*/
    const userSaved = await newUser.save();

    const token = await createAccessToken({_id: userSaved._id}) /*Enviamos como 'payload' un objeto que contenga el '_id' del usuario nuevo guardado. Esta funcion nos devuelve el 'token', si es que la promesa se resolvio de manera exitosa. Colocamos el 'await', para detener el flujo de la funcion asincronica async 'register', hasta que se resuelva la promesa. */
    
    res.cookie(
      "token",
      token
    ); /*Establece en el header de la respuesta una 'cookie' llamada 'token' y que tiene como valor el valor del token generado con jwt.sign(). */

    res.json({/*Respuesta al frontend */
      _id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => { /*Genera un 'token' cada que alguien se registra */
  const { username, email, password } = req.body;

  try {
    /*hash(): Convierte un string a una serie de caracteres aleatorios*/
    const passwordHash = await bcrypt.hash(password, 10);

    /*Creamos una instancia del model User, y le asignamos los datos del req.body */
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });

    /*save() es un metodo de Sequelize
    Guardamos el registro (que tiene forma de objeto) en la tabla 'users' de la base de datos*/
    const userSaved = await newUser.save();

    const token = await createAccessToken({_id: userSaved._id}) /*Enviamos como 'payload' un objeto que contenga el '_id' del usuario nuevo guardado. Esta funcion nos devuelve el 'token', si es que la promesa se resolvio de manera exitosa. Colocamos el 'await', para detener el flujo de la funcion asincronica async 'register', hasta que se resuelva la promesa. */
    
    res.cookie(
      "token",
      token
    ); /*Establece en el header de la respuesta una 'cookie' llamada 'token' y que tiene como valor el valor del token generado con jwt.sign(). */

    res.json({/*Respuesta al frontend */
      _id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

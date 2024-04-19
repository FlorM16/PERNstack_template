import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  /*Genera un 'token' cada que alguien se registra */

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

    const token = await createAccessToken({
      _id: userSaved._id,
    }); /*Enviamos como 'payload' un objeto que contenga el '_id' del usuario nuevo guardado. Esta funcion nos devuelve el 'token', si es que la promesa se resolvio de manera exitosa. Colocamos el 'await', para detener el flujo de la funcion asincronica async 'register', hasta que se resuelva la promesa. */

    res.cookie(
      "token",
      token
    ); /*Establece en el header de la respuesta una 'cookie' llamada 'token' y que tiene como valor el valor del token generado con jwt.sign(). */

    res.json({
      /*Respuesta al frontend */ _id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    /*Buscamos si el usuario existe en algun registro de la tabla 'users'.Si es que sí existe trae el registro en forma de objeto json en la constante 'userFound */
    const userFound = await User.findOne({ where: { email } });

    /*Si no encontró el registro, el response nos mostrará un mensaje*/
    if (!userFound)
      return res.status(400).json({ message: "User not found" });
    //console.log(userFound);

    /*compare(): Compara el 'password' del request.body con el 'password' del usuario encontrado 'userFound' . Esto nos devuelve un 'booleano'*/
    const isMatch = await bcrypt.compare(password, userFound.password);

    /*Si el booleano es 'false', es decir no encuentra coincidencia, nos devuelve un mensaje */
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({
      _id: userFound._id,
    }); /*Creamos un 'token' con el '_id'del usuario encontrado 'userFound' */

    res.cookie(
      "token",
      token
    ); /*Establece en el header de la respuesta una 'cookie' llamada 'token' y que tiene como valor el valor del token generado con jwt.sign(). */

    res.json({
      /*Respuesta al frontend */ _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const logout = (req, res) => {
  /*Establece en el header de la respuesta una 'cookie' llamada 'token' y que tiene como valor el vacio. Y la fecha de expiracion es 0 (la fecha de inicio del tiempo UNIX que es el 1 de enero de 1970), esto hace que el navegador elimine la cookie porque ya ha caducado. */
  res.cookie('token', "", {
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logout successful" });
};

export const profile = async (req, res) => {

  /*Nos devuelve un registro en forma de objeto JSON, que coincida con el '_id' del 'payload' del 'token' decodificado en 'authRequired'. */
  const userFound = await User.findByPk(req.user._id)

  /*Si no encuentra un registro que coincida, nos devuelve un mensaje */
  if(!userFound) return res.status(400).json({message: "User not found"})

  /*Responde en el frontend los datos del usuario encontrado. */
  return res.json({
    _id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
  
}




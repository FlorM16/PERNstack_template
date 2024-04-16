import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    /*Creamos una instancia del model User, y le asignamos los datos del req.body */
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    /*save() es un metodo de Sequelize
    Guardamos el registro (que tiene forma de objeto) en la tabla 'users' de la base de datos*/
    const userSaved = await newUser.save();

    res.json(userSaved);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = (req, res) => {
  res.send("login");
};

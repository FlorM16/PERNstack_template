import { Task } from "../models/task.model.js";

export const createTasks = async (req, res) => {
  try {
    const { title, description } = req.body;

    /*Solo crea un registro con los campos de la tabla 'tasks'*/
    const newTask = new Task({
      title: title,
      description: description,
      userId:
        req.user
          ._id /*'req.user' es un dato que viene desde el 'token' descifrado en el middleware 'authRequired' y que se guardó en el 'req'  */,
    });

    /*Se guarda el registro en la tabla 'tasks' de la base de datos*/
    const saveTask = await newTask.save();

    res.json(saveTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    /*Encuentra todos los registros en forma de objeto JSON{} y todos estaran dentro de un arreglo [] */
    const tasks = await Task.findAll({
      attributes: [
        "_id",
        "title",
        "description",
        "userId",
      ] /*Se especifican las columnas que se deben devolver en el resultado de la consulta */,
      order: [
        ["_id", "DESC"],
      ] /*ordena los resultados en orden descendente según el _id. De la más reciente a la más antigua */,
      where: {
        userId: req.user._id,
      } /*Filtro que solo selecciona aquellas tareas que tengan el 'userId' del usuario descifrado del 'token' guardado en req.user*/,
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const { _id } =
    req.params; /*Accede al valor del parámetro '_id' en la URL y utilizarlos en la lógica de manejo de rutas. req.params es un objeto JSON. */
  /* Esto extrae el _id de los parámetros de la solicitud. Los parámetros de la solicitud se utilizan para proporcionar datos dinámicos en la URL, como /products/1, donde 1 sería el _id. */

  try {
    const task = await Task.findOne({
      where: { _id },
      attributes: ["_id", "title", "description", "userId"],
    });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTasks = async (req, res) => {
  const { _id } = req.params; /*Toma el '_id' de la 'task' que queremos actualizar */
  try {
    const task = await Task.findOne({ /*Buscamos el registro (objeto) que tiene el '_id' que tomamos del req.params y lo guardamos en 'task' */
      attributes: ["_id", "title", "description"],
      where: { _id },
    });

    /*Enviamos desde el front mediante el 'req.body' el objeto que tiene los nuevos valores de los atributos */
    task.set(req.body);/*set (): Funcion de sequelize, nos permite actualizar los valores de los atributos de un registro, antes de guardarlo en la base de datos. Toma como argumento un objeto donde las claves son los nombres de los atributos (de la tabla de la base de datos) que queremos actualizar y los nuevos valores que queremos asignar a esos atributos */

    await task.save(); /*save(): Funcion de sequelize, para guardar los cambios realizados en el registro de la base de datos. */

    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTasks = async (req, res) => {
  const { _id } =
    req.params; /*Extrae el _id del objeto req.params de la solicitud */
  try {
    await Task.destroy({
      /*destroy(): Funcion de sequelize, que se utiliza para eliminar un registro de la tabla de la base de datos */
      where: {
        _id,
      } /*Se elimina el registro que tenga el '_id' indicado especifico */,
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createTasks,
  getTasks,
  getTask,
  updateTasks,
  deleteTasks,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/tasks", authRequired, createTasks);
router.get("/tasks", authRequired, getTasks);
/*En Express.js, puedes definir rutas con parámetros utilizando dos puntos : seguidos del nombre del parámetro en la definición de la ruta: localhost:3000/api/tasks/:_id */
router.get("/tasks/:_id", authRequired, getTask);
router.put("/tasks/:_id", authRequired, updateTasks);
router.delete("/tasks/:_id", authRequired, deleteTasks);

export default router;

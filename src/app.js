import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js'


//Server
const app = express();

//Muestra las peticiones (POST, GET, PUT, etc) en consola
app.use(morgan("dev"));

//Express transforma los req.body en objetos JSON o formato de JS
app.use(express.json())

//Procesa todas las rutas de auth.routes
app.use('/api',authRoutes)

export default app;

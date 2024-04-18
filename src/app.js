import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser"; /*Es un middleware para Express que analiza las cookies adjuntas en las solicitudes HTTP entrantes al backend (solicitudes GET). Permite al backend procesar fácilmente las cookies que se envían desde el cliente frontend (navegador) como parte de las solicitudes HTTP */

import authRoutes from './routes/auth.routes.js'


//Server
const app = express();

//Muestra las peticiones (POST, GET, PUT, etc) en consola
app.use(morgan("dev"));

//Express transforma los req.body en objetos JSON o formato de JS
app.use(express.json())

//Express transforma los req.header.cookie en objeto JSON
app.use(cookieParser())

//Procesa todas las rutas de auth.routes
app.use('/api',authRoutes)

export default app;

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  /*Actua como middleware que verifica que exista un token en el req.headers para que recien pueda pasar a la siguiente 'funcion'*/

  /*Podemos traer al backend el valor del token (desde el navegador) a traves del req.header en las cuales uno de sus valores es el .cookie */
  // const token = req.headers.cookie;
  // console.log(token)
  //"token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIyLCJpYXQiOjE3MTM0NzczMjEsImV4cCI6MTcxMzU2MzcyMX0.UfkzEqTv1Kj6bnB2b0j1S5WdO90z8VqF4XnzSeWUCJc"

  /*Podemos obtener el valor netamente del token directamente de las cookies, gracias a cookieParser*/
  const token = req.cookies.token;
  //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIyLCJpYXQiOjE3MTM0NzczMjEsImV4cCI6MTcxMzU2MzcyMX0.UfkzEqTv1Kj6bnB2b0j1S5WdO90z8VqF4XnzSeWUCJc"

  /*Si el valor del token esta vacio, nos indicará un mensaje de error */
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(
    token /*El 'token' al que se le debe verificar los datos 'payload' despues de decodificarlo. */,

    TOKEN_SECRET /* La clave secreta que se utilizó para firmar/codificar el 'token' en el 'login'*/,

    (err, user) => {
      /*Callback: Se ejecuta despues de que se verifique el 'token'. 
    - err: En caso que el 'token' sea invalido se envia un error al cliente. 
    - user: Es un objeto que contiene el 'payload' inicial o valor decodificado del 'token', tambien se le llama 'decoded'. */
      if (err) return res.status(403).json({ message: "Invalid token" });

      req.user =
        user; /*Se asigna el objeto 'user' al objeto 'req' de Express. Esto hace que la información del usuario decodificado esté disponible para cualquier middleware(s) posterior(es) en la cadena de middleware de Express. Por ejemplo, otros controladores de rutas pueden acceder a req.user para obtener información sobre el usuario autenticado. */

      next(); /*Pasa a la siguiente funcion */
    }
  );
};

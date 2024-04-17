import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) { /*Esta funcion nos retorna el valor del 'token'. La generacion del token (dependiendo el payload y otros factores) puede demorar, es por ello que envolvemos la funcion jwt.sign en una promesa que si se resuelve nos devuelve el valor del token 'resolve(token)' y si no se resuelve nos devuelve el error 'reject(err)' */
  // {
  //   _id: userSaved._id /*Payload: Informacion que deseamos incluir en el 'token' */,
  // },

  return new Promise((resolve, reject) => {
    jwt.sign(/*Para generar el 'token' */
      payload,
      TOKEN_SECRET /*SecretKey: Clave para cifrar/descifrar la informacion del 'token' */,
      {
        expiresIn: "1d" /* Options: Tiempo de expiracion del 'token' */,
      },
      (err, token) => {/* Callback: Es una funcion que espera a que el valor del 'token' se genere de manera obligatoria para que la logica se ejecute satisfactoriamente. */
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}




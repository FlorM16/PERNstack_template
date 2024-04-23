import axios from 'axios' 
/*axios: Para realizar solicitudes HTTP desde el navegador (frontend) */

const API = 'http://localhost:3000/api'/*Se define la URL base de la API del backend */

export const registerRequest = user => axios.post(`${API}/register`, user)
/* registerRequest(): Se define esta funcion que toma como parámetro un objeto de nombre 'user'. Esta función utiliza Axios para realizar una solicitud POST a la ruta '${API}/register', la cual es la ruta definida en el backend 'http://localhost:3000/api/register' para registrar 'users', donde el 'req.body', estara definido en el objeto 'user' que ingresa como parámetro.*/
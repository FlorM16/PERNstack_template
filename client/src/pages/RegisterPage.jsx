import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  /*register(): Metodo proporcionado por el hook 'useForm'. Se utiliza para registrar 'input' en un formulario y conectarlos con el estado de useForm. Cuando sse registra 'input' se esta indicando a 'react-hook-form' que debe rastrear y manejar ese campo en particular
    Tiene dos argumentos principales:
    - name: El nombre 'string' que le damos al 'input'. Debe ser unico en el formulario y nos servirá para identificar el campo en el estado del formulario.
    - options: Es un objeto que contiene las reglas de validacion del 'input' como required, minLength, 'maxLenght', etc.*/

  /*handleSubmit(): Metodo proporcionado por el hook 'useForm'. Toma una función como argumento, y será ejecutada cuando el formulario se envíe correctamente, es decir, cuando todos los 'inputs' pasen la validación. En el argumento de esta funcion podemos poner los 'values' objeto que contiene los valores de lo ingresado en los 'inputs' */

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form
        onSubmit={handleSubmit(async (values) => {
            console.log(values)
          const res = await registerRequest(
            values
          ); /*Importo la funcion definida en 'api/auth.js' y como parámetro 'values' que es el objeto que contiene la informacion ingresada en los 'inputs' */
          console.log(res);
        })}
      >
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        <button type="submit"> Register </button>
      </form>
    </div>
  );
}

export default RegisterPage;

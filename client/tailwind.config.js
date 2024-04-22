/** @type {import('tailwindcss').Config} */
export default {
  content: [
    /*En el archivo 'index.html' y cualquier archivo dentro de 'src' que tenga las extenciones 'js,ts,jsx,tsx' podemos usar las clases de tailwind  */
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


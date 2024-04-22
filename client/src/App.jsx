import {BrowserRouter, Routes, Route} from 'react-router-dom'
/* 'react-router-dom': Es un módulo para definir rutas en React. Define qué componente debe mostrarse en función de la ruta actual de la URL */
/* 
App(): Es el componente principal de la aplicacion
<BrowserRouter>: Es el contenedor Contexto. Este componente es esencial para envolver nuestra aplicación y proporcionar la funcionalidad de enrutamiento.
<Routes>: Este componente sirve como contenedor para todas nuestras rutas y dentro definiremos todas las rutas de nuestra aplicación.
<Route>: Definimos la ruta_
- 'path': Especifica la URL que esta ruta debe coincidir.
- 'element': Especifica qué componente debe renderizarse cuando la URL coincida con esta ruta
*/

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>Home Page</h1>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/task' element={<h1>Tasks page</h1>} />
      <Route path='/add-task' element={<h1>New task</h1>} />
      <Route path='/task/:_id' element={<h1>Update task</h1>} />
      <Route path='/profile' element={<h1>Profile</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
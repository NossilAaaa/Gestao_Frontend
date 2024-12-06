import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/telas/Home';
import Departamento from './componentes/telas/departamento/Departamento'
import Funcionario from './componentes/telas/funcionario/Funcionario';
import Login from './componentes/telas/login/Login';
import MenuPublico from './componentes/MenuPublico';
import MenuPrivado from './componentes/MenuPrivado';

const router = createBrowserRouter([
  {
    path: "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element :  <Login/>
      }         
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children:[
      {
        index : true,
        element : <Home/>
      },
      {
        path : "departamentos",
        element : <Departamento/>
      },
      {
        path : "funcionarios",
        element : <Funcionario/>
      }
    ]
  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import './Menu.css'

function Menu() {

    return (
        <>
            <div className='background'>
                <div className='itens-menu'>
                    <a href='/'> Home </a>
                    <a href='/departamentos'>Departamentos </a>
                    <a href='/funcionarios'>Funcionarios </a>
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default Menu;
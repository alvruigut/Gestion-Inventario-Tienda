import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export function Carrito(){

    const [carritoItems, setCarritoItems] = useState([]);

    useEffect(() => {
        const getCarrito = async () => {
            const response = await fetch('http://localhost:9000/api/carrito/'); //poner controlador 
            const data = await response.json();
            setCarritoItems(data);
        };
        getCarrito();
      }, []);

return(
<div className='App-header'>
        <h1>Carrito</h1>
        <ul>
            <li> 
            <Link to="/">Pantalla Inicial</Link>
            </li>
        </ul>
        <Link to="/all">Productos</Link>

      </div>
    );

}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function AllProducts() {

    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const getAllProducts = async () => {
          const response = await fetch('http://localhost:9000/api/productos/all');  
          const data = await response.json();
          setProducts(data);
      };
      getAllProducts();
    }, []);
  
    return (
      <div className='App-header'>
        <h1>Todos Los Productos</h1>
        <ul>
          <li> 
            <Link to="/">Pantalla Inicial</Link>
          </li>
          {products.map(product => (
           <li key={product.id}>
             {product.nombre}: {product.precio} €
         </li>
          ))}
        </ul>
      </div>
    );
  }
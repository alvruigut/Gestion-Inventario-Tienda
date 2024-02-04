import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import foto from '../imagenes/productoempty.png';

export function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/productos/all');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener la lista de productos', error);
      }
    };
    getAllProducts();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#ffffff' }}>Productos del Juanillo</h1>
      <Link to="/crear" style={addButtonStyle}>
        Agregar Nuevo Producto
      </Link>
      {products.map((product) => (
        <div key={product.id} style={productStyle}>
          <img
            src={product.imagen ? product.imagen : foto}
            alt={product.nombre}
            style={imageStyle}
          />
          <div>
            <div style={letras}>{product.nombre }: {product.precio}€</div>
            <div style={letras}>{product.descripcion || 'N/A'}</div>
            <Link to={`/editar/${product.nombre}`} style={editButtonStyle}>
            Editar
          </Link>
          </div>
        </div>
      ))}
    </div>
  );
}




const editButtonStyle = {
  backgroundColor: '#1f3d20', // Fondo verde oscuro
  color: '#ffffff', // Texto en color blanco
  padding: '8px 16px', // Ajusta el espaciado interno
  borderRadius: '4px', // Bordes redondeados
  textDecoration: 'none', // Sin subrayado
  display: 'inline-block', // Alinear en línea
  marginTop: '10px', // Espacio superior
};



const letras = {
  fontSize: '20px',
  color: '#ffffff',
  marginBottom: '10px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
};




const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#3d5e3a',
  padding: '20px', 
};

const productStyle = {
  marginBottom: '20px',
  border: '2px solid #1f3d20',
  padding: '15px',
  width: '90%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderRadius: '15px',
};

const imageStyle = {
  width: '200px', 
  borderRadius: '10px',
  marginRight: '10px',
};

const addButtonStyle = {
  backgroundColor: '#1f3d20',
  padding: '10px',
  borderRadius: '5px',
  textDecoration: 'none',
  color: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  display: 'inline-block',
  marginBottom: '20px',
};

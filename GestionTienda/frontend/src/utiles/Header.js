import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div style={headerStyle}>
      <div className="logo" style={logoStyle}>
        <Link to="/" style={linkStyle}>
          Inicio
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/all" style={linkStyle}>
          Productos
        </Link>
        <Link to="/carrito" style={linkStyle}>
          Nuevo pedido
        </Link>
        <Link to="/inventario" style={linkStyle}>
          Inventario 
        </Link>
      </div>
    </div>
  );
}

const headerStyle = {
  position: 'fixed', // Hace que el encabezado sea fijo
  top: 0, // Lo coloca en la parte superior de la ventana
  width: '100%', // Ocupa el 100% del ancho
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: '#e6f7e6',
  padding: '10px',
  zIndex: 1000, // Asegura que el encabezado esté en la capa superior
};

const logoStyle = {
  marginRight: 'auto',
};

const linkStyle = {
  color: '#006600',
  fontFamily: 'Arial, sans-serif',
  fontSize: '25px',
  textDecoration: 'none',
  margin: '0 10px',
  
};

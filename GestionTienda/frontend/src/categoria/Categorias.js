import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState('');

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/productos/cantidad');
        const data = await response.json();

        const categoriasArray = Object.keys(data).map(nombre => ({
          nombre,
          cantidad: data[nombre],
        }));

        setCategorias(categoriasArray);
      } catch (error) {
        console.error('Error al obtener la lista de categorías', error);
      }
    };

    getAllCategories();
  }, []);

  const handleDeleteConfirmation = (c, cantidad) => {
 
      setCategoriaToDelete(c);
      setShowConfirmation(true);
    
  };

  const handleDelete = () => {
    window.location.href = `/eliminar/categoria/${categoriaToDelete}`;
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div style={containerStyle}>
      <div className="categorias">
        <Link to="/crear/categoria" style={categoryButtonStyle}>Agregar Nueva Categoria</Link>
      </div>
      {categorias.map((categoria) => (
        <div key={categoria.nombre} style={productStyle}>
          <div style={letras}>Categoria: {categoria.nombre}</div>
          <div style={letras}>Cantidad de productos: {categoria.cantidad}</div>
          <div style={cplus}>
            <Link to={`/editar/categoria/${categoria.nombre}`} style={editButtonStyle}>
              Editar
            </Link>
            <button style={editButtonStyleDelete} onClick={() => handleDeleteConfirmation(categoria.nombre, categoria.cantidad)}>Eliminar</button>
          </div>
        </div>
      ))}

      {showConfirmation && (
        <div style={confirmationStyle}>
          <p>{`¿Seguro que quieres eliminar la categoria ${categoriaToDelete}?`}</p>
          <button style={yesButtonStyle} onClick={handleDelete}>Aceptar</button>
          <button style={cancelButtonStyle} onClick={handleCancelDelete}>Cancelar</button>
        </div>
      )}
    </div>
  );
};



 const cplus = {
    marginTop: '10px',
    marginLeft: '15px',
    display: 'flex',
    flexDirection: 'column',
  
  };
  
  const categoryButtonsStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    marginBottom: '15px',
  };
  
  const categoryButtonStyle = {
    backgroundColor: '#e6f7e6',
    color: 'black',
    border: 'none',
    marginBottom: '20px', // Reducido de 100px a 20px
    textDecoration: 'none',
    fontSize: '25px',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
  };
  
  
  const yesButtonStyle = {
    background: '#28a745',
    color: '#ffffff',
    padding: '8px 16px', // Ajusta el espaciado interno
    marginLeft: '100px',
    borderRadius: '4px', // Bordes redondeados
  
  };
  
  const cancelButtonStyle = {
    background: '#dc3545',
    color: '#ffffff',
    padding: '8px 16px', // Ajusta el espaciado interno
    marginLeft: '15px',
    borderRadius: '4px', // Bordes redondeados
  
  };
  
  const confirmationStyle = {
    background: '#e6f7e6',
    padding: '10px',
    borderRadius: '5px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  
  
  const editButtonStyle = {
    backgroundColor: 'blue', // Fondo verde oscuro
    color: '#ffffff', // Texto en color blanco
    padding: '10px 16px', // Ajusta el espaciado interno
    borderRadius: '4px', // Bordes redondeados
    textDecoration: 'none', // Sin subrayado
    display: 'inline-block', // Alinear en línea
    fontFamily: 'Arial, sans-serif',
    justifyContent: 'center',
  };
  
  const editButtonStyleDelete = {
    backgroundColor: 'red', // Fondo verde oscuro
    color: '#ffffff', // Texto en color blanco
    padding: '10px 16px', // Ajusta el espaciado interno
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
    marginTop: '50px',
  };
  
  const productStyle = {
    marginBottom: '20px',
    border: '2px solid #1f3d20',
    padding: '15px',
    width: '90%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '15px',
    marginTop: '20px',

  };
  
  const imageStyle = {
    width: '200px',
    borderRadius: '10px',
    marginRight: '10px',
    height: '150px'
  };
  
  
  
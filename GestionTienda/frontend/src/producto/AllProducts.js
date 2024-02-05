import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import foto from '../imagenes/productoempty.png';

export function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');

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


  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/categorias/all');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener la lista de productos', error);
      }
    };
    getAllCategories();
  }, []);


  const handleDeleteConfirmation = (productName) => {
    setProductToDelete(productName);
    setShowConfirmation(true);
  };
  const handleDelete = () => {
    window.location.href = `/eliminar/${productToDelete}`;    
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCategoryFilter = async (categoriaNombre) => {
    try {
      const response = await fetch(`http://localhost:9000/api/productos/categoria/${categoriaNombre}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(`Error al obtener productos de la categoría ${categoriaNombre}`, error);
    }
  };
  const handleShowAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/productos/all');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener todos los productos', error);
    }
  };
  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#ffffff' , marginTop: '40px'}}>Productos del Juanillo</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/crear" style={{ ...categoryButtonStyle, marginRight: '10px' }}>Agregar Nuevo Producto</Link>
        <Link to="/crear/categoria" style={categoryButtonStyle}>Agregar Nueva Categoría</Link>
      </div>
      <div style={categoryButtonsStyle}>
      <button style={categoryButtonStyle} onClick={() => handleShowAllProducts()}> Todos  </button>
        {categorias.map((categoria) => ( <button key={categoria.id} style={categoryButtonStyle}  onClick={() => handleCategoryFilter(categoria.nombre)} > {categoria.nombre}
        </button>
        ))}
        
      </div>
      {products.map((product) => (
        <div key={product.id} style={productStyle}>
          <img src={product.imagen ? product.imagen : foto} alt={product.nombre} style={imageStyle} />
          <div>
            <div style={letras}>{product.nombre}: {product.precio}€</div>
            <div style={letras}>{product.descripcion || 'N/A'}</div>
            <div style={letras}>{product.categoria.nombre}</div>
            <Link to={`/editar/${product.nombre}`} style={editButtonStyle}>
              Editar
            </Link>
            <button style={editButtonStyleDelete} onClick={() => handleDeleteConfirmation(product.nombre)} >
            Eliminar
             </button>
        </div>
        </div>
      ))}

      {showConfirmation && (
        <div style={confirmationStyle}>
          <p>{`¿Seguro que quieres eliminar el producto ${productToDelete}?`}</p>
          <button style={yesButtonStyle}  onClick={handleDelete}>Aceptar</button>
          <button  style={cancelButtonStyle}  onClick={handleCancelDelete}>Cancelar</button>
        </div>
      )}
    </div>
  );
};











const categoryButtonsStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
  marginBottom: '15px',
};

const categoryButtonStyle = {
  backgroundColor: '#e6f7e6', /* Color verde */
  color: 'black', /* Letra blanca */
  border: 'none',
  fontSize: '25px',
  padding: '15px 25px',
  margin: '0 10px',
  cursor: 'pointer',
  borderRadius: '15px',
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
  padding: '8px 16px', // Ajusta el espaciado interno
  borderRadius: '4px', // Bordes redondeados
  textDecoration: 'none', // Sin subrayado
  display: 'inline-block', // Alinear en línea
  marginTop: '10px', // Espacio superior
};



const editButtonStyleDelete = {
  backgroundColor: 'red', // Fondo verde oscuro
  color: '#ffffff', // Texto en color blanco
  padding: '10px 16px', // Ajusta el espaciado interno
  borderRadius: '4px', // Bordes redondeados
  textDecoration: 'none', // Sin subrayado
  display: 'inline-block', // Alinear en línea
  marginTop: '10px', // Espacio superior
  marginLeft: '10px', // Espacio derecho
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
  height: '150px'
};



import { useState, useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';

export function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [nuevoId, setNuevoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCarritos = async () => {
      try {
        const response = await fetch('http://localhost:9000/carrito/allhoy');
        const data = await response.json();

        setCarrito(data);
      } catch (error) {
        console.error('Error al obtener los carritos', error);
      }
    };

    getAllCarritos();
  }, []);

  const handleCrearCarrito = async () => {
    try {
      const response = await fetch('http://localhost:9000/carrito/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      const nuevoId = data.id;
      // Redirige al nuevo carrito creado
      setNuevoId(nuevoId);
      navigate(`/carrito/${nuevoId}`);
    } catch (error) {
      console.error('Error al crear un nuevo carrito', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div>
        {/* Aquí agregamos un botón para crear un nuevo carrito */}
        <button onClick={handleCrearCarrito} style={categoryButtonStyle}>Nuevo Carrito</button>
      </div>
      {carrito.map((carrito) => (
        <div key={carrito.id} style={productStyle}>
          <div style={letras}>Identificador: {carrito.id}</div>
          <div style={letras}>Fecha: {carrito['Fecha Creacion']}</div>
        </div>
      ))}
    </div>
  );
}


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



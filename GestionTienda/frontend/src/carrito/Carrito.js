import { useState, useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
export function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  const getAllCarritos = async () => {
    try {
      const response = await fetch('http://localhost:9000/carrito/allhoy');
      const data = await response.json();
      setCarrito(data);
    } catch (error) {
      console.error('Error al obtener los carritos', error);
    }
  };

  useEffect(() => {
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
      navigate(`/carrito/${data.id}`);
    } catch (error) {
      console.error('Error al crear un nuevo carrito', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Eliminando carrito con ID:', id);
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este carrito?');
  
      if (confirmDelete) {
        const response = await fetch(`http://localhost:9000/carrito/eliminar/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log('Carrito eliminado exitosamente')
          await getAllCarritos(); 
        } else {
          console.error('Error al eliminar el carrito');
        }
      } else {
        console.log('Eliminación de carrito cancelada');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de eliminación', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div>
        <button onClick={handleCrearCarrito} style={categoryButtonStyle}>Nuevo Carrito</button>
      </div>
      {carrito.map((carrito) => (
        <div key={carrito.id} style={productStyle}>
          <div>
            <div style={letras}>Identificador: {carrito.id}</div>
            <div style={letras}>Fecha: {carrito['Fecha Creacion']}</div>
          </div>
          <div style={cplus}>
            <Link to={`/carrito/${carrito.id}`} style={categoryButtonStyle}> Carrito </Link>
            <button style={categoryButtonStyle} onClick={() => handleDelete(carrito.id)}>Eliminar</button>
          </div>
        </div>
      ))}
  
    </div>
  );
}

const cplus = {
  marginTop: '10px',
  marginLeft: '15px',
  display: 'flex',
  flexDirection: 'row',

};


const categoryButtonStyle = {
  backgroundColor: '#e6f7e6',
  color: 'black',
  border: 'none',
  marginBottom: '15px', // Reducido de 100px a 20px
  textDecoration: 'none',
  fontSize: '25px',
  padding: '7px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginRight: '10px',
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




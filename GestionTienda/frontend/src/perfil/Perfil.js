import React, { useEffect, useState } from 'react';

export function Perfil() {
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        fetchPerfil();
    }, []);

    const fetchPerfil = async () => {
        try {
            const response = await fetch('http://localhost:9000/perfil/all');
            if (!response.ok) {
                throw new Error('No se pudo obtener el perfil');
            }
            const data = await response.json();
            setPerfil(data);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1>Perfil</h1>
            {perfil && (
                <div>
                    <h3>Ingresos: {perfil.ingresos}€</h3>
                    <div>
                        {perfil.carritos.map((carrito, index) => (
                            <div key={index}>
                                <h4>Carrito {index + 1}</h4>
                                <p>Cantidad de productos: {carrito.cantidadProductos}</p>
                                <p>Fecha de creación: {carrito.fechaCreacion}</p>
                                <p>Total: {carrito.total}€</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}


const cplus = {
    marginTop: '20px',
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
    backgroundColor: '#e6f7e6', /* Color verde */
    color: 'black', /* Letra blanca */
    border: 'none',
    textDecoration: 'none', // Sin subrayado
  
    fontSize: '25px',
    padding: '10px',
    margin: '5px',
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
    padding: '10px 16px', // Ajusta el espaciado interno
    borderRadius: '4px', // Bordes redondeados
    textDecoration: 'none', // Sin subrayado
    display: 'inline-block', // Alinear en línea
    marginTop: '10px', // Espacio superior
    marginLeft: '10px', // Espacio derecho
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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [fechaFiltro, setFechaFiltro] = useState(() => {
      // Recuperar la fecha seleccionada del localStorage o usar la fecha actual
      const storedDate = localStorage.getItem('fechaFiltro');
      return storedDate ? new Date(storedDate) : new Date();
  });
  const [ganancias, setGanancias] = useState(0);
  const [errorFecha, setErrorFecha] = useState(false); // Estado para controlar el error de fecha

  useEffect(() => {
      fetchPerfil();
  }, [fechaFiltro]); // Vuelve a obtener los datos del perfil cuando cambia la fecha

  useEffect(() => {
      // Almacenar la fecha seleccionada en el localStorage
      localStorage.setItem('fechaFiltro', fechaFiltro.toISOString());
  }, [fechaFiltro]);

  const fetchPerfil = async () => {
      try {
          const response = await fetch('http://localhost:9000/perfil/all');
          if (!response.ok) {
              throw new Error('No se pudo obtener el perfil');
          }
          const data = await response.json();
          setPerfil(data);
          calcularGanancias(data);
      } catch (error) {
          console.error('Error al obtener el perfil:', error);
      }
  };

  const calcularGanancias = (data) => {
      if (!data || !data.carritos) {
          setGanancias(0);
          return;
      }
      
      const gananciasFiltradas = data.carritos
          .filter(carrito => {
              const fechaCarrito = new Date(carrito.fechaCreacion);
              return (
                  fechaCarrito.getFullYear() === fechaFiltro.getFullYear() &&
                  fechaCarrito.getMonth() === fechaFiltro.getMonth() &&
                  fechaCarrito.getDate() === fechaFiltro.getDate()
              );
          })
          .reduce((total, carrito) => total + carrito.total, 0);

      setGanancias(gananciasFiltradas);
  };

  const filtrarPorFecha = (carrito) => {
      const fechaCarrito = new Date(carrito.fechaCreacion);
      return (
          fechaCarrito.getFullYear() === fechaFiltro.getFullYear() &&
          fechaCarrito.getMonth() === fechaFiltro.getMonth() &&
          fechaCarrito.getDate() === fechaFiltro.getDate()
      );
  };

  const handleFechaChange = (e) => {
      const inputValue = e.target.value;
      const isValidDate = !!Date.parse(inputValue); // Verificar si la fecha es válida
      
      if (!isValidDate) {
          setErrorFecha(true);
          return;
      }
      
      setErrorFecha(false);
      setFechaFiltro(new Date(inputValue));
  };

  return (
      <div style={containerStyle}>
          <h1 style={letras3}>Perfil</h1>
          <Link to="/editar/contrasena" style={letras}>Cambiar contraseña</Link>
          <div>
              <label style={letras} htmlFor="fecha">Selecciona una fecha: </label>
              <input
                  type="date"
                  id="fecha"
                  value={fechaFiltro.toISOString().split('T')[0]} // Formato ISO para input date
                  onChange={handleFechaChange}
                  style={{ width: '180px', height: '40px', fontSize: '18px', backgroundColor: '#6b8f68', border: 'none', borderRadius: '5px', marginBottom: '20px'}}
              />
          </div>
          <h1 style={letras2}>Ingresos: {ganancias}€</h1> 

          {perfil && (
              <div>
                  {perfil.carritos
                      .filter(filtrarPorFecha) // Filtrar carritos por fecha
                      .map((carrito, index) => (
                          <div key={index} style={box}>
                              <h4 style={letras}>Carrito {index + 1}</h4>
                              <p style={letras}>Cantidad de productos: {carrito.cantidadProductos}</p>
                              <p style={letras}>Fecha: {carrito.fechaCreacion}</p>
                              <p style={letras}>Total: {carrito.total}€</p>
                          </div>
                      ))}
              </div>
          )}
      </div>
  );
}


  const letras = {
    fontSize: '20px',
    color: '#ffffff',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
  };
  const letras2 = {
    fontSize: '30px',
    color: '#ffffff',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
  };  
  const letras3 = {
    fontSize: '40px',
    color: '#ffffff',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    minHeight: '100vh',
    backgroundColor: '#3d5e3a',
    padding: '20px',
};

const box={
  backgroundColor: '#4d6e4a',
  padding: '20px',
  margin: '20px',
  borderRadius: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
  width: '100%',
  textAlign: 'center',
  fontSize: '20px',
  lineHeight: '1.5',
  marginBottom: '10px',

}
  

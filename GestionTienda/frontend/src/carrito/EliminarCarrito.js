
import React, { useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';

export function EliminarCarrito() {
    const navigate = useNavigate();
    const { idCarrito } = useParams();


  useEffect(() => {
    const eliminar = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/carrito/eliminar/${idCarrito}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Carrito eliminado exitosamente');
          navigate('/carrito');
        } else {
          console.error('Error al eliminarlo');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud de eliminación', error);
      }
    };

    eliminar();
  }, [ idCarrito,navigate]);

    return (
        <div >
            <p>Eliminando carrito...</p>
        </div>
    );
}
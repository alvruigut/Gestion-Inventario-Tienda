
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function EliminarMoroso() {
  const navigate = useNavigate();
  const { nombre } = useParams();

  useEffect(() => {
    const eliminar = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/morosos/eliminar/${nombre}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Moroso eliminado exitosamente');
          navigate('/fiacion');
        } else {
          console.error('Error al eliminarlo');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud de eliminación', error);
      }
    };

    eliminar();
  }, [nombre, navigate]);

  return (
    <div>
      <p>Eliminando moroso...</p>
    </div>
  );
}
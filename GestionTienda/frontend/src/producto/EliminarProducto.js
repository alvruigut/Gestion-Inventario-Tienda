
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function EliminarProducto() {
  const navigate = useNavigate();
  const { nombre } = useParams();

  useEffect(() => {
    const eliminarProducto = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/productos/eliminar/${nombre}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Producto eliminado exitosamente');
          navigate('/all');
        } else {
          console.error('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud de eliminación', error);
      }
    };

    eliminarProducto();
  }, [nombre, navigate]);

  return (
    <div>
      <p>Eliminando producto...</p>
    </div>
  );
}

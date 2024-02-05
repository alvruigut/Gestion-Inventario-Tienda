
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function EliminarCategoria() {
  const navigate = useNavigate();
  const { nombre } = useParams();

  useEffect(() => {
    const eliminarCategoria = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/categorias/eliminar/${nombre}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Categoria eliminada exitosamente');
          navigate('/categorias');
        } else {
          console.error('Error al eliminar la categoria');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud de eliminación', error);
      }
    };

    eliminarCategoria();
  }, [nombre, navigate]);

  return (
    <div>
      <p>Eliminando categoría...</p>
    </div>
  );
}
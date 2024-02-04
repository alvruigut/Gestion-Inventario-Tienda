import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './products.css';  

export function EditarProducto() {
  const navigate = useNavigate();
  const { nombre } = useParams();



  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
  });
  
  useEffect(() => {
    const getProducto = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/productos/${nombre}`);
        const data = await response.json();
        
        // Utiliza la forma de función para garantizar la actualización correcta del estado
        setProducto(prevProducto => ({
          ...prevProducto,
          nombre: data.nombre,
          precio: data.precio,
          descripcion: data.descripcion,
          imagen: data.imagen,
        }));
        
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };
    getProducto();
  }, [nombre]);
  
  useEffect(() => {
    const getProducto = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/productos/actualizar/${nombre}`);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };
    getProducto();
  }, [nombre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9000/api/productos/actualizar/${nombre}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      if (response.ok) {
        console.log('Producto editado exitosamente');
        navigate('/all');
      } else {
        console.error('Error al editar el producto');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de edición', error);
    }
  };

  return (
    <div className="container">
  
      <form onSubmit={handleSubmit} className="form">
        <label>Nombre</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} className="input" />
        <label>Precio</label>
        <input type="text" name="precio" value={producto.precio} onChange={handleChange} className="input" />
        <label>Descripción</label>
        <input type="text" name="descripcion" value={producto.descripcion} onChange={handleChange} className="input" />
        <label>Imagen</label>
        <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} className="input" />
        <button type="submit" className="button">Editar Producto</button>
      </form>
    </div>
  );
}

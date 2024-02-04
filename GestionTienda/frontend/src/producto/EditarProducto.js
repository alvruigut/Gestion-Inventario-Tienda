import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
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
        const response = await fetch(`http://localhost:9000/api/productos/nombre/${nombre}`);
        const data = await response.json();
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
    if (String(producto.precio).includes(',')) {
      alert('Juan pon un  punto y quita la coma para el precio.');
      return;
    }
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

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageName = file.name;
      setProducto({
        ...producto,
        imagen: imageName,
      });
    }
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: 'image/*' });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra imágenes aquí o haz clic para cambiarla</p>
          {producto.imagen && <img src={producto.imagen} alt="Imagen seleccionada" className="dropzoneFoto" />}
        </div>
        <Gallery items={[{ src: producto.imagen }]} showPlayButton={false} showFullscreenButton={false} />
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre del producto" required className="input" />
        <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción del producto" className="textarea"></textarea>
        <input type="text" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio" required className="input" />
        <button type="submit" className="button">Editar producto</button>
      </form>
    </div>
  );
}
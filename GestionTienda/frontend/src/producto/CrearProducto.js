import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './products.css';  

export function CrearProducto() {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    imagen: '',  
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: false,
    categoria: {
      id: 1
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value
    });
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
      
  

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const response = await fetch('http://localhost:9000/api/productos/nuevo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (producto.precio.includes(',')) {
      alert('Juan pon punto en vez de coma');
      return;
    }
  
    if (response.ok) {
      console.log('Producto creado exitosamente');
      navigate('/all');
    } else {
      console.error('Error al crear el producto');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: 'image/*' });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra imágenes aquí o haz clic para seleccionar</p>
          {producto.imagen && <img src={producto.imagen} alt="Imagen seleccionada" className="dropzoneFoto" />}
        </div>
        <Gallery items={[{ src: producto.imagen }]} showPlayButton={false} showFullscreenButton={false} />

        <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre del producto" required className="input" />
        <textarea name="descripcion" onChange={handleChange} placeholder="Descripción del producto" className="textarea"></textarea>
        <input type="text" name="precio" onChange={handleChange} placeholder="Precio" required className="input" />
        <input type="number" name="categoria.id" onChange={handleChange} placeholder="ID de la categoría" required className="input" />
        <button type="submit" className="button">Crear producto</button>
      </form>
    </div>
  );
}

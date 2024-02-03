import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export function CrearProducto() {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    imagenes: [],
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
    setProducto({
      ...producto,
      imagenes: producto.imagenes.concat(acceptedFiles.map(file => ({ file, src: URL.createObjectURL(file) })))
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!producto.imagen) {
      setProducto({
        ...producto,
        imagen: '/imagenes/productoempty.png'
      });
    }

    const response = await fetch('http://localhost:9000/api/productos/nuevo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (response.ok) {
      console.log('Producto creado exitosamente');
      navigate('/all');
    } else {
      console.error('Error al crear el producto');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: 'image/*' });

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
      <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          <p>Arrastra imágenes aquí o haz clic para seleccionar</p>
        </div >
        <Gallery  style={styles.galleryContainer}  items={producto.imagenes} showPlayButton={false} showFullscreenButton={false} />
  
        <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre del producto" required style={styles.input} />
        <textarea name="descripcion" onChange={handleChange} placeholder="Descripción del producto" style={styles.textarea}></textarea>
        <input type="number" name="precio" onChange={handleChange} placeholder="Precio" required style={styles.input} />
        <input type="number" name="categoria.id" onChange={handleChange} placeholder="ID de la categoría" required style={styles.input} />
        <button type="submit" style={styles.button}>Crear producto</button>
      </form>
    </div>
  );
}




const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1f3d20', // Fondo verde claro
  },
  form: {
    width: '400px',
    padding: '20px',
    border: '1px solid #3c763d', // Borde verde oscuro
    borderRadius: '8px',
    backgroundColor: '#e6f7ea', // Mismo fondo que el contenedor
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  dropzone: {
    width: '90%',
    minHeight: '10px',  // Ajusta la altura según tus necesidades
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
  },

};
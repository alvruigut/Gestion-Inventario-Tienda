import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './products.css';  


export function EditarProducto() {
  const navigate = useNavigate();
  const { nombre } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    categoria: {
      nombre: '',
    },
  });

  useEffect(() => {
    const getProducto = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/productos/nombre/${nombre}`);
        const data = await response.json();
        setProducto({
          ...producto,
          nombre: data.nombre,
          precio: data.precio,
          descripcion: data.descripcion,
          imagen: data.imagen,
          categoria: {
            nombre: data.categoria.nombre,
          },
        });
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };

    getProducto();
  }, [nombre]);  

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/categorias/all');
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        const data = await response.json();
        console.log('Categorías obtenidas:', data);
        setCategorias(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria.nombre') {
      setProducto({
        ...producto,
        categoria: {
          nombre: value,
        },
      });
    } else {
      setProducto({
        ...producto,
        [name]: value,
      });
    }
  };
  const handleCancelar = () => {
    navigate('/all');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (String(producto.precio).includes(',')) {
      alert('Juan, pon un punto y quita la coma para el precio.');
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
  };

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
        <select name="categoria.nombre" onChange={handleChange} value={producto.categoria.nombre} required className="input">
        <option value="" disabled>Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.nombre} value={categoria.nombre}>{categoria.nombre}</option>
        ))}
      </select>
        <button type="submit" className="button">Editar producto</button>
        <button type="button" onClick={handleCancelar} className="buttonC">Cancelar</button>

      </form>
    </div>
  );
}


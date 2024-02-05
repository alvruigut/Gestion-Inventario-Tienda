import React, { useState , useEffect} from "react";
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
      nombre: '',
    },
  });

  const [categorias, setCategorias] = useState([]);

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
      setProducto((prevProducto) => ({
        ...prevProducto,
        categoria: {
          ...prevProducto.categoria,
          nombre: value,
        },
      }));
    } else {
      setProducto((prevProducto) => ({
        ...prevProducto,
        [name]: value,
      }));
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
  const handleCancelar = () => {
    navigate('/all');
  };
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

        <select name="categoria.nombre" onChange={handleChange} value={producto.categoria.nombre} required className="input">
        <option value="" disabled>Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.nombre} value={categoria.nombre}>{categoria.nombre}</option>
        ))}
      </select>

        <button type="submit" className="button">Crear producto</button>
        <button type="button" onClick={handleCancelar} className="buttonC">Cancelar</button>

      </form>
    </div>
  );
}
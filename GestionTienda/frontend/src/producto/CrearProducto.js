import React, { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './products.css';  

export function CrearProducto() {
  const navigate = useNavigate();
  const [imagen, setImagen] = useState(null);
  const [producto, setProducto] = useState({
    imagen: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: true,
    cantidadDisponible: 0,
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
  const handleAddImage = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:9000/api/productos/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const imageName = await response.text();
          setImagen(imageName);
        } else {
          console.error('Error al cargar la imagen:', response.statusText);
        }
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    }
  };
  
  const handleCancelar = () => {
    navigate('/inventario');
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
      navigate('/inventario');
    } else {
      console.error('Error al crear el producto');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: 'image/*' });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
      <div>
        <input type="file" onChange={(e) => handleAddImage(e.target.files)} accept="image/*" />
      </div>
      <Gallery items={[{ src: producto.imagen }]} showPlayButton={false} showFullscreenButton={false} />
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra imágenes aquí o haz clic para seleccionar</p>
          {producto.imagen && <img src={producto.imagen} alt="Imagen seleccionada" className="dropzoneFoto" />}
        </div>
        <Gallery items={[{ src: producto.imagen }]} showPlayButton={false} showFullscreenButton={false} />
        <div style={inputwrapper}>
        <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre del producto" required className="input" />
        <span style={asterisk}>*</span>
        </div>
        <textarea name="descripcion" onChange={handleChange} placeholder="Descripción del producto" className="textarea"></textarea>
        <div style={inputwrapper}>
        <input type="text" name="precio" onChange={handleChange} placeholder="Precio" required className="input" />
        <span style={asterisk}>*</span>
        </div>
        <div style={inputwrapper}>
        <input type="number" name="cantidadDisponible" onChange={handleChange} placeholder="Cantidad" required className="input" />
        <span style={asterisk}>*</span>
        </div>
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

const inputwrapper ={
  position: 'relative',
};

const asterisk= {
  position: 'absolute',
  top:' 50%',
  right: '10px ',
  transform: 'translateY(-50%)',
  color: 'black',
  fontSize: '30px', 
}
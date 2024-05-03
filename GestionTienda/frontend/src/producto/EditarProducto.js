import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './products.css';  


export function EditarProducto() {
  const navigate = useNavigate();
  const { nombre } = useParams();
  const [imagen, setImagen] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    pvp:0,
    precio: 0,
    descripcion: '',
    imagen: '',
    cantidadDisponible: 0,
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
          cantidadDisponible: data.cantidadDisponible,
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
    navigate('/inventario');
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
        navigate('/inventario');
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: 'image/*' });

  return (
<div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '150px' }}>
  <form onSubmit={handleSubmit} className="form" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div>
        <input type="file" onChange={(e) => handleAddImage(e.target.files)} accept="image/*" />
      </div>
      <Gallery items={[{ src: producto.imagen }]} showPlayButton={false} showFullscreenButton={false} />
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra imágenes aquí o haz clic para cambiarla</p>
          {producto.imagen && <img src={'/'+producto.imagen} alt="Imagen seleccionada" className="dropzoneFoto" />}
        </div>
        <Gallery items={[{ src: producto.imagen }]} showPlayButton={false} showFullscreenButton={false} />

        <div style={inputwrapper}>
        <label>Nombre</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre del producto" required className="input" />
        <span style={asterisk}>*</span>
        </div>
        <label>Descripción</label>
        <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción del producto" className="textarea"></textarea>
        <label>Precio proveedor</label>
        <div style={inputwrapper}>
        <input type="text" name="pvp" value={producto.precio} onChange={handleChange} placeholder="Precio proveedor" required className="input" />
        <span style={asterisk}>*</span>
        </div>
        <label>Precio</label>
        <div style={inputwrapper}>
        <input type="text" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio" required className="input" />
        <span style={asterisk}>*</span>
        </div>
        <label>Cantidad disponible</label>
        <div style={inputwrapper}>
        <input type="number" value={producto.cantidadDisponible}  name="cantidadDisponible" onChange={handleChange} placeholder="Cantidad" required className="input" />
        <span style={asterisk}>*</span>
        </div>
        <label>Categoria</label>
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
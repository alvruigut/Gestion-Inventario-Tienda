import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="imagen" onChange={handleChange} placeholder="URL de la imagen" style={styles.input} />
        <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre del producto" required style={styles.input} />
        <textarea name="descripcion" onChange={handleChange} placeholder="Descripción del producto" style={styles.textarea}></textarea>
        <input type="number" name="precio" onChange={handleChange} placeholder="Precio" required style={styles.input} />
        <label style={styles.checkboxLabel}>
          Disponible:
          <input type="checkbox" name="disponible" onChange={e => setProducto({ ...producto, disponible: e.target.checked })} checked={producto.disponible} style={styles.checkbox} />
        </label>
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
};

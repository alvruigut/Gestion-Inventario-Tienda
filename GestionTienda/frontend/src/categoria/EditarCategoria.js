import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './categoria.css';  
 
export function EditarCategoria() {
    const navigate = useNavigate();
    const { nombre } = useParams();
    const [categoria, setCategoria] = useState({
        nombre: '',
    });
    useEffect(() => {
        const getCategoria = async () => {
          try {
            const response = await fetch(`http://localhost:9000/api/categorias/nombre/${nombre}`);
            const data = await response.json();
            setCategoria({
              ...categoria,
              nombre: data.nombre,
              
            });
          } catch (error) {
            console.error('Error al obtener la categoria', error);
          }
        };
    
        getCategoria();
      }, [nombre]);  


      const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({
            ...categoria,
            [name]: value,
          });
        
      };
      const handleCancelar = () => {
        navigate('/categorias');
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:9000/api/categorias/editar/${nombre}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
          });
    
          if (response.ok) {
            console.log('Categoria editada exitosamente');
            navigate('/categorias');
          } else {
            console.error('Error al editar la categoria');
          }
        } catch (error) {
          console.error('Error al enviar la solicitud de edición', error);
        }
      };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="nombre" value={categoria.nombre} onChange={handleChange} placeholder="Nombre del producto" required className="input" />
        <button type="submit" className="button">Editar categoria</button>
        <button type="button" onClick={handleCancelar} className="buttonC">Cancelar</button>
      </form>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function CrearCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({
    nombre: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
        setCategoria((prevCategoria) => ({
            ...prevCategoria,
            [name]: value,
        }));
  };

  const handleCancelar = () => {
    navigate('/all');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:9000/api/categorias/nuevo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    });


    if (response.ok) {
      console.log('Categoria creado exitosamente');
      navigate('/all');
    } else {
      console.error('Error al crear la categoria');
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre de la categoria" required className="input" />
        <button type="submit" className="button">Crear Categoria</button>
        <button type="button" onClick={handleCancelar} className="buttonC">Cancelar</button>
      </form>
    </div>
  );
}
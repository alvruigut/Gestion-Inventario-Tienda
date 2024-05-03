import React, { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';

export function CrearMoroso(){

    const navigate = useNavigate();
    const [moroso, setMoroso] = useState({
      nombre: '',
      movil: '',
      precio: 0,
      
    });
  

    const handleChange = (e) => {
        const { name, value } = e.target;
            setMoroso((prev) => ({
            ...prev,
            [name]: value,
          }));
      };

      
  const handleCancelar = () => {
    navigate('/fiacion');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:9000/api/morosos/nuevo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moroso),
    });
    if (response.ok) {
      console.log('Moroso creado exitosamente');
      navigate('/fiacion');
    } else {
      console.error('Error al crear el moroso');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
      <div style={inputwrapper}>

        <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre del moroso" required className="input" />
        <span style={asterisk}>*</span>

        </div>

        <input type="text" name="movil" onChange={handleChange} placeholder="Información: Móvil , dirección..."  className="input" />
        <div style={inputwrapper}>

        <input type="text" name="precio" onChange={handleChange} placeholder="Cuanto debe" required className="input" />
        <span style={asterisk}>*</span>

        </div>


        <button type="submit" className="button">Crear Moroso</button>
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
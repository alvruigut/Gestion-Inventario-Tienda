import React, { useState, useEffect } from 'react';
import { Link ,useParams} from "react-router-dom";
import foto from '../imagenes/productoempty.png';

export function AddProductos() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { idCarrito } = useParams();
  const [items, setItem] = useState([]);
  const[total,setTotal]=useState(0);


  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/productos/all');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener la lista de productos', error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const getCarritoId = async () => {
      try {
        const response = await fetch(`http://localhost:9000/carrito/ver/${idCarrito}`);
        const data = await response.json();
        setItem(data.lineasCarrito);
        setTotal(data.total);

      } catch (error) {
        console.error('Error al obtener la lista de productos', error);
      }
    };
    getCarritoId();
  }, []);

//    @DeleteMapping("/vaciar")
//    @DeleteMapping("/eliminar/{productoId}/{carritoId}")



  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/categorias/all');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener la lista de productos', error);
      }
    };
    getAllCategories();
  }, []);

  const handleCategoryFilter = async (categoriaNombre) => {
    const response = await fetch(`http://localhost:9000/api/productos/categoria/${categoriaNombre}`);
    const data = await response.json();
    setProducts(data);
  };

  const handleShowAllProducts = async () => {
    const response = await fetch('http://localhost:9000/api/productos/all');
    const data = await response.json();
    setProducts(data);
  };

  const handleAddProductToCart = async (productId) => {
    const response = await fetch(`http://localhost:9000/carrito/agregar/${productId}/${idCarrito}`, {
      method: 'POST', 
    });

    if (response.ok) { 
      const updatedCartResponse = await fetch(`http://localhost:9000/carrito/ver/${idCarrito}`);
      const updatedCartData = await updatedCartResponse.json();
      setItem(updatedCartData.lineasCarrito);
      setTotal(updatedCartData.total);
      console.log('Producto añadido al carrito correctamente');
    } else {
      console.error(`Error: ${response.status}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#3d5e3a', display: 'grid', gridTemplateColumns: '2fr 1fr', placeItems: 'start', height: '100%', padding: '30px' }}>
  
  <div style={{ backgroundColor: '#3d5e3a', display: 'grid', gridTemplateColumns: '2fr 1fr', placeItems: 'start' }}>
  <div style={{ gridColumn: '1 / 2',padding:'20px', border: '3px solid #ffffff', borderRadius: '10px', backgroundColor: '#3d5e3a',marginTop:'30px' }}>
    <h1 style={{ color: 'white', marginTop: '50px' }}>  <Link to="/carrito" style={categoryButtonStyleF}> Finalizar Compra</Link></h1>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item.id} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={item.producto.imagen ? '/'+item.producto.imagen : foto} alt={item.producto.nombre} style={{ width: '75px', height: '75px', marginRight: '20px' }} />
            <div>
              <p style={{ fontSize: '1.2em', marginBottom: '5px' }}>{item.producto.nombre} {item.precio}€</p>
              <p style={{ fontSize: '1.2em', marginTop: '5px' }}>Cantidad: {item.cantidad} --- {item.precio*item.cantidad}€</p>  
            </div>
          </div>
        </li>
      ))}
      <p style={{ fontSize: '2em', fontWeight: 'bold' }}>Total: {total}€</p> 
    </ul>
  </div>
  </div>

      <div style={{ gridColumn: '2 / 3' }}>
        <button style={categoryButtonStyle2} onClick={() => handleShowAllProducts()}> Todos  </button>
        {categorias.map((categoria) => (
          <button key={categoria.id} style={categoryButtonStyle} onClick={() => handleCategoryFilter(categoria.nombre)} > {categoria.nombre}</button>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxHeight: '500px', overflowY: 'scroll' }}>
          {products.map((product) => (
            <button 
              key={product.id} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',background:'green', borderRadius:'10px'}}
              onClick={() => handleAddProductToCart(product.id)}
            >
              <img src={product.imagen ? '/' + product.imagen : foto} alt={product.nombre} style={imageStyle} />
              <div style={letras}>{product.nombre}</div>
              <div style={letras}>{product.precio}€</div>
            </button>
          ))}
        </div>
      </div>
  
    </div>
  );
          }
          const categoryButtonStyleF = {
            backgroundColor: '#e6f7e6',
            color: 'black',
            border: 'none',
            textDecoration: 'none',
            fontSize: '19px',
            padding: '10px',
            margin: '5px',
            cursor: 'pointer',
            borderRadius: '15px',

          };
const letras = {
  fontSize: '20px',
  color: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
};const categoryButtonStyle = {
  backgroundColor: '#e6f7e6',
  color: 'black',
  border: 'none',
  textDecoration: 'none',
  fontSize: '19px',
  padding: '10px',
  margin: '5px',
  cursor: 'pointer',
  borderRadius: '15px',
};
const categoryButtonStyle2 = {
  backgroundColor: '#e6f7e6',
  color: 'black',
  border: 'none',
  textDecoration: 'none',
  fontSize: '19px',
  padding: '10px',
  margin: '5px',
  cursor: 'pointer',
  borderRadius: '15px',
  marginTop:'50px',
};
const imageStyle = {
  width: '80px',
  borderRadius: '10px',
  marginRight: '10px',
  height: '80px'
};

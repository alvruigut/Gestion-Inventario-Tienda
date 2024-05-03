import React, { useState, useEffect } from 'react';
import { Link ,useParams} from "react-router-dom";
import foto from '../imagenes/productoempty.png';

export function AddProductos() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { idCarrito } = useParams();
  const [items, setItem] = useState([]);
  const[total,setTotal]=useState(0);
  const [padding, setPadding] = useState(15);


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
        setPadding(data.lineasCarrito.length > 0 ? 0 : 150);
      } catch (error) {
        console.error('Error al obtener la lista de productos', error);
      }
    };
    getCarritoId();
  }, [idCarrito]);

const handleEmptyCart = async () => {
  try {
    const response = await fetch(`http://localhost:9000/carrito/vaciar/${idCarrito}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setItem([]);
      setTotal(0);
      setPadding(150);
      console.log('El carrito se ha vaciado correctamente');
    } else {
      console.error('Error al vaciar el carrito:', response.status);
    }
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
  }
};
const handleIncreaseQuantity = async (index) => {
  const updatedItems = [...items];
  updatedItems[index].cantidad++;
  setItem(updatedItems);
  updateTotal(updatedItems);
  const response = await fetch(`http://localhost:9000/carrito/aumentar/${updatedItems[index].producto.nombre}/${idCarrito}`, {
    method: 'PUT'
  });
  if (!response.ok) {
    console.error('Error al aumentar la cantidad del producto en el carrito:', response.status);
  }
};

const handleDecreaseQuantity = async (index) => {
  const updatedItems = [...items];
  if (updatedItems[index].cantidad > 1) {
    updatedItems[index].cantidad--;
    setItem(updatedItems);
    updateTotal(updatedItems);
    const response = await fetch(`http://localhost:9000/carrito/disminuir/${updatedItems[index].producto.nombre}/${idCarrito}`, {
      method: 'PUT'
    });
    if (!response.ok) {
      console.error('Error al disminuir la cantidad del producto en el carrito:', response.status);
    }
  }
};

const updateTotal = (updatedItems) => {
  const newTotal = updatedItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  setTotal(newTotal);
};

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
  const handleAddItem = () => {
    setPadding(0); 
  };
  const handleAddProductToCart = async (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (!productToAdd) {
      console.error('Producto no encontrado');
      return;
    }
  
    const response = await fetch(`http://localhost:9000/carrito/agregar/${productId}/${idCarrito}`, {
      method: 'POST',
    });
  
    // Verifica si la cantidad a agregar es menor o igual al stock disponible
    if (productToAdd.cantidadDisponible > 0) {
      // Resta 1 al stock del producto
      const updatedStock = productToAdd.cantidadDisponible - 1;
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return { ...product, cantidadDisponible: updatedStock };
        }
        return product;
      });
      setProducts(updatedProducts);
  
      const updatedCartResponse = await fetch(`http://localhost:9000/carrito/ver/${idCarrito}`);
      const updatedCartData = await updatedCartResponse.json();
      setItem(updatedCartData.lineasCarrito);
      setTotal(updatedCartData.total);
      handleAddItem();
      console.log('Producto añadido al carrito correctamente');
    } else {
      alert('No hay suficiente stock para este producto');
    }
  };
  
  
  const handleDeleteProductFromCart = async (productoId) => {
    try {
      const response = await fetch(`http://localhost:9000/carrito/eliminar/${productoId}/${idCarrito}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const updatedCartResponse = await fetch(`http://localhost:9000/carrito/ver/${idCarrito}`);
        const updatedCartData = await updatedCartResponse.json();
        setItem(updatedCartData.lineasCarrito);
        setTotal(updatedCartData.total);
        setPadding(updatedCartData.lineasCarrito.length > 0 ? 0 : 150);
        console.log('Producto eliminado del carrito correctamente');
      } else {
        console.error('Error al eliminar el producto del carrito:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };
  return (
    <div style={{ backgroundColor: '#3d5e3a', display: 'grid', gridTemplateColumns: '2fr 1fr', placeItems: 'start', height: '100%', padding: '30px' }}>
  <div style={{ backgroundColor: '#3d5e3a', display: 'grid', gridTemplateColumns: '2fr 1fr', placeItems: 'start' }}>
  <div style={{ gridColumn: '1 / 2',padding:'20px', border: '3px solid #ffffff', borderRadius: '10px', backgroundColor: '#3d5e3a',marginTop:'25px' }}>
        
  <ul style={{ listStyle: 'none', padding: `${padding}px` }}>
          {items.map((item, index) => (
            <li key={item.id} style={{ borderBottom: index !== items.length - 1 ? '1px solid #ccc' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <img src={item.producto.imagen ? '/'+item.producto.imagen : foto} alt={item.producto.nombre} style={{ width: '75px', height: '75px', marginRight: '20px' }} />
                <div>
                  <p style={{ fontSize: '1.2em', marginBottom: '5px' }}>{item.producto.nombre} {item.precio}€</p>
                  <p style={{ fontSize: '1.2em', marginTop: '5px' }}>Cantidad: 
                    <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                    {item.cantidad}
                    <button onClick={() => handleIncreaseQuantity(index)}>+</button> 
                    --- {item.precio*item.cantidad}€
                  </p>
                  <button style={categoryButtonStyleF2} onClick={() => handleDeleteProductFromCart(item.producto.id)}>Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

  </div>
  
  <h1 style={{ color: 'white', marginTop: '50px' }}>  <Link to="/carrito" style={categoryButtonStyleF}> Finalizar Compra</Link> <p style={{ fontSize: '1em', fontWeight: 'bold' }}>Total: {total}€</p> 
  <button style={categoryButtonStyleF} onClick={handleEmptyCart}>Vaciar Carrito</button>

</h1>
  
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

const categoryButtonStyleF2 = {
  backgroundColor: '#e6f7e6',
  color: 'black',
  border: 'none',
  textDecoration: 'none',
  fontSize: '19px',
  padding: '5px',
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

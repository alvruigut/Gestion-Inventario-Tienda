import './App.css';
import {BrowserRouter as Router, Route, Routes,Link}from 'react-router-dom';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
function HomePage() {
  return (
    <Fragment>
      <div className='App-header'>
        <h1>Bienvenido Juanillo</h1>
        <ul>
          <li> 
            <Link to="/all">AllProductos</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

function AllProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/productos/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='App-header'>
      <h1>Todos Los Productos</h1>
      <ul>
        <li> 
          <Link to="/">Pantalla Inicial</Link>
        </li>
        {products.map(product => (
          <li key={product.id}>{product.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <main>  
        <Routes>
          <Route path="/" element={<HomePage/>}> </Route>
          <Route path="/all" element={ <AllProducts/>} ></Route>
        </Routes>
      </main>  
    </Router>
  )
}

export default App;

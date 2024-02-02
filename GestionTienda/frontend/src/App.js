import './App.css';
import {BrowserRouter as Router, Route, Routes,Link}from 'react-router-dom';
import { Fragment } from 'react';
import { AllProducts } from './producto/AllProducts';
import { Carrito } from './carrito/Carrito';
import { CrearProducto } from './producto/CrearProducto';


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



function App() {
  return (
    <Router>
      <main>  
        <Routes>
          <Route path="/" element={<HomePage/>}> </Route>
          <Route path="/all" element={ <AllProducts/>} ></Route>
          <Route path="/carrito" element={ <Carrito/>} ></Route>
          <Route path="/crear" element={ <CrearProducto/>} ></Route>
        </Routes>
      </main>  
    </Router>
  )
}

export default App;

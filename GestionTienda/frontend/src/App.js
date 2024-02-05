import './App.css';
import {BrowserRouter as Router, Route, Routes}from 'react-router-dom';
import { Fragment } from 'react';
import { AllProducts } from './producto/AllProducts';
import { Carrito } from './carrito/Carrito';
import { CrearProducto } from './producto/CrearProducto';
import {Header} from './utiles/Header';
import { EditarProducto } from './producto/EditarProducto';
import{EliminarProducto} from './producto/EliminarProducto';
import {CrearCategoria} from './categoria/CrearCategoria.js';
import {EliminarCategoria} from './categoria/EliminarCategoria.js';
import {EditarCategoria} from './categoria/EditarCategoria.js';
import {Categorias} from './categoria/Categorias.js';

function HomePage() {
  return (
    <Fragment>
      <div className='App-header'>
        <h1 className='welcome-text'>Bienvenido Juanillo</h1>
      </div>
    </Fragment>
  );
}


function App() {
  return (
    <Router>
      <Header />
        <main>  
          <Routes>
            <Route path="/" element={<HomePage/>}> </Route>
            <Route path="/inventario" element={ <AllProducts/>} ></Route>
            <Route path="/carrito" element={ <Carrito/>} ></Route>
            <Route path="/crear" element={ <CrearProducto/>} ></Route>
            <Route path="/editar/:nombre" element={ <EditarProducto/>} ></Route>
            <Route path="/eliminar/:nombre" element={ <EliminarProducto/>} ></Route>
            <Route path="/crear/categoria" element={ <CrearCategoria/>} ></Route>
            <Route path="/eliminar/categoria/:nombre" element={ <EliminarCategoria/>} ></Route>
            <Route path="/editar/categoria/:nombre" element={ <EditarCategoria/>} ></Route>
            <Route path="/categorias" element={ <Categorias/>} ></Route>
            
          </Routes>
        </main>  
    </Router>
  )
}

export default App;

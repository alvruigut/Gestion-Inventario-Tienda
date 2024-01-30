import './App.css';
import {BrowserRouter as Router, Route, Routes,Link}from 'react-router-dom';
import { Fragment } from 'react';

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
  return (
      <div className='App-header'>
        <h1>Todos Los Productos</h1>
        <ul>
          <li> 
            <Link to="/">Pantalla Inicial</Link>
          </li>
        </ul>
      </div>
  )}

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

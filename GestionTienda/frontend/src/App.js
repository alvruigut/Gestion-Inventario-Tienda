import './App.css';
import {BrowserRouter as Router, Route, Routes,Link, Form}from 'react-router-dom';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { AllProducts } from './producto/AllProducts';
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
        </Routes>
      </main>  
    </Router>
  )
}

export default App;

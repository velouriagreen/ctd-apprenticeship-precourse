import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Email from './Email';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './Navbar';
import './App.css';
import Products from './Products';
//import Categories from './Categories/Categories';
import Product from './Product';

function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

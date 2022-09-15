import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './Navbar';
import './App.css';
import Products from './Products';
import Categories from './Categories';
function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

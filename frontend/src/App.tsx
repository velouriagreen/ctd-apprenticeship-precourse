import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './Navbar';
import './App.css';
import Products from './Products';
import Categories from './Categories/Categories';
import Dairy from './Categories/Dairy';
import Meat from './Categories/Meat';
import Vegetables from './Categories/Vegetables';
import Fruit from './Categories/Fruit';

function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/dairy' element={<Dairy />} />
          <Route path='/meat' element={<Meat />} />
          <Route path='/vegetables' element={<Vegetables />} />
          <Route path='/fruit' element={<Fruit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

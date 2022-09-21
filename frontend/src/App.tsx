import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './Navbar';
import './App.css';
import Products from './Products';
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

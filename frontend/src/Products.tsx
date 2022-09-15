import React, { useState, useEffect } from 'react';
import axios from 'axios';

//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface Product {
  id: Number;
  name: String;
  inventory: Number;
  category: String;
}

const Products: React.FC<{}> = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1 className='wiggly-piggly-header'>Welcome to the Wiggly Piggly!</h1>
      {products.map((product: Product) => {
        return (
          <Card style={{ width: '18rem' }} className='all-products-cards'>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Some description here</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;

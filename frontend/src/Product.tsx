import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const Product: React.FC<{}> = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      // Grabbing the productId variable from the URL with useParams
      // Making an axios call to grab the single product information dynamically
      .get(`http://localhost:3001/products/${params.productId}`)
      .then((res) => {
        //console.log('res', res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.productId]); //dependency array

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

// Grab the productId variable from the URL
// Make an axios to grab the single product information
// SHow that porudct on the page

const Product: React.FC<{}> = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${params.productId}`)
      .then((res) => {
        console.log('res', res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.productId]); //dependency array

  return <div>{product.name}</div>;
};

export default Product;

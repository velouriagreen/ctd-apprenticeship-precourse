import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <section>
      {products.map((product: Product) => {
        return <h1>{product.name}</h1>;
      })}
    </section>
  );
};

export default Products;

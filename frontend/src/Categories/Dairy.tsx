import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

interface Product {
  id: Number;
  name: String;
  inventory: Number;
  category: String;
}

const Dairy: React.FC<{}> = () => {
  const [dairy, setDairy] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((res) => {
        setDairy(
          res.data.filter((product: { category: string }) => {
            return product.category === 'dairy';
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //1. Sort alphabetically

  //2. Sort by inventory
  const inStock = dairy.filter((product: Product) => {
    return product.inventory > 0;
  });

  return (
    <div>
      <h1>Welcome to the Wiggly Piggly Dairy Section</h1>
      <Tabs
        defaultActiveKey='profile'
        id='uncontrolled-tab-example'
        className='mb-3'
      >
        <Tab eventKey='home' title='All Dairy Products'>
          {dairy.map((product: Product) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant='top' src='holder.js/100px180' />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Some context here</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Tab>
        <Tab eventKey='profile' title='In Stock'>
          {inStock.map((product: Product) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant='top' src='holder.js/100px180' />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Some context here</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dairy;
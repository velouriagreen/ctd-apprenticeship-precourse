import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface Product {
  id: Number;
  name: String;
  inventory: Number;
  category: String;
  description: String;
}

const Products: React.FC<{}> = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [category, setCategory] = useState<string | null>('');
  const [sort, setSort] = useState<string | null>('');

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

  const changeInventory = (product: Product, updatedInventory: number) => {
    // Update backend first
    axios
      .put(`http://localhost:3001/products/${product.id}`, {
        ...product,
        inventory: updatedInventory,
      })
      .then((res) => {
        // Update frontend 2nd
        const updatedProducts: Array<Product> = products.map((currProduct) => {
          if (product.id === currProduct.id) {
            console.log('true?');
            return { ...currProduct, inventory: updatedInventory };
          } else {
            return currProduct;
          }
        });
        setProducts(updatedProducts);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let updatedProducts = products;

  if (category) {
    updatedProducts = products.filter((product: Product) => {
      return product.category === category;
    });
  }

  if (sort === 'A-Z') {
    updatedProducts.sort((productA: Product, productB: Product) => {
      let x = productA.name[0].toUpperCase();
      let y = productB.name[0].toUpperCase();

      return x < y ? -1 : x > y ? 1 : 0;
    });
  } else if (sort === 'Z-A') {
    updatedProducts.sort((productA: Product, productB: Product) => {
      let x = productA.name[0].toUpperCase();
      let y = productB.name[0].toUpperCase();

      return y < x ? -1 : y > x ? 1 : 0;
    });
  }

  // const inStock = products.filter((product: Product) => {
  //   return product.inventory > 0;
  // });

  const uniqueCategories = products.reduce((categories, product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
    return categories;
  }, []);

  console.log('uniqyw', uniqueCategories);
  console.log('current category filter', category);

  return (
    <div>
      <h1 className='wiggly-piggly-header'>Welcome to the Wiggly Piggly!</h1>
      <Dropdown onSelect={(eventKey) => setSort(eventKey)}>
        <InputGroup className='mb-3'>
          <Form.Control
            placeholder='Search for Grocery Item'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
          />
          <InputGroup.Text id='basic-addon2'>Search</InputGroup.Text>
        </InputGroup>

        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          Sort By:
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey='A-Z'>A - Z</Dropdown.Item>
          <Dropdown.Item eventKey='Z-A'>Z - A</Dropdown.Item>
          {/* <Dropdown.Item>In Stock</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={(eventKey) => setCategory(eventKey)}>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          Filter By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {uniqueCategories.map((category: string) => {
            return (
              <Dropdown.Item eventKey={category}>
                {category[0].toUpperCase() + category.slice(1)}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>

      {updatedProducts.map((product: Product) => {
        return (
          <Card style={{ width: '18rem' }} className='all-products-cards'>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Link to={`/products/${product.id}`} className='button-as-link'>
                This is where the post link will go
              </Link>
              <button
                onClick={() => changeInventory(product, product.inventory + 1)}
              >
                +
              </button>
              {product.inventory}
              <button
                onClick={() => changeInventory(product, product.inventory - 1)}
              >
                -
              </button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;

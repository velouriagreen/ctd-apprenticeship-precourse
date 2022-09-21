import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Email from './Email';

//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

interface Product {
  id: number;
  name: string;
  inventory: number;
  category: string;
  description: string;
  image: string;
}

const Products: React.FC<{}> = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [category, setCategory] = useState<string | null>('');
  const [sort, setSort] = useState<string | null>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((res) => {
        //console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const changeInventory = (product: Product, updatedInventory: number) => {
    // If the updatedInventory is <= 0
    // Disable decrementing
    // Make sure not to update the backend/frontend
    // Send out an email
    if (updatedInventory <= 0) {
      setShowModal(true);
      setCurrentProduct(product);
    }
    // Update backend first
    axios
      .put(`http://localhost:3001/products/${product.id}`, {
        ...product,
        inventory: updatedInventory,
      })
      .then((res) => {
        // Update frontend 2nd
        const updatedProducts: Array<Product> = products.map((currProduct) => {
          //if the current product matches the product id, then
          if (product.id === currProduct.id) {
            //console.log('true?');
            //update the inventory key with the updatedInventory
            return { ...currProduct, inventory: updatedInventory };
          } else {
            return currProduct;
          }
        });
        setProducts(updatedProducts);
        //console.log('updatedProducts in put request', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**************** SORT A-Z ****************/

  //override const
  let updatedProducts = products;
  //first checking to see if category is present/not null
  if (category) {
    //Update products array to be an array of the selected category's products
    updatedProducts = products.filter((product: Product) => {
      return product.category === category;
    });
  }
  //sorting if the A-Z option is selected
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

  /*******************CATEGORY SORT DROPDOWN MENU**************/

  //if category is selected in dropdown menu, then returning updated categories array to include current, selected category
  const uniqueCategories = products.reduce<string[]>(
    (categories, product: Product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
      return categories;
    },
    []
  );

  //console.log('uniqyw', uniqueCategories);
  //console.log('current category filter', category);
  //eventKey is passed to the <Nav> onSelect callback and
  // is used to set the <Nav> component's activeKey prop.

  return (
    <div>
      <h1 className='wiggly-piggly-header'>Welcome to the Wiggly Piggly!</h1>

      <Container className='drop-down-buttons'>
        <Dropdown
          onSelect={(eventKey) => setSort(eventKey)}
          className='sort-by-drop-down'
        >
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            Sort By:
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey='A-Z'>A - Z</Dropdown.Item>
            <Dropdown.Item eventKey='Z-A'>Z - A</Dropdown.Item>
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
      </Container>
      {updatedProducts.map((product: Product) => {
        return (
          <Container className='updated-products-container'>
            <Card style={{ width: '18rem' }} className='all-products-cards'>
              <Card.Img variant='top' src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Link to={`/products/${product.id}`} className='button-as-link'>
                  Click to learn more about {product.name}
                </Link>
                <br></br>
                <Container className='inventory-btns'>
                  <Button
                    onClick={() =>
                      changeInventory(product, product.inventory + 1)
                    }
                  >
                    +
                  </Button>
                  {product.inventory}
                  <Button
                    disabled={!product.inventory}
                    onClick={() =>
                      changeInventory(product, product.inventory - 1)
                    }
                  >
                    -
                  </Button>
                </Container>
              </Card.Body>
            </Card>
          </Container>
        );
      })}
      {showModal === true ? (
        <Email setShowModal={setShowModal} product={currentProduct} />
      ) : null}
    </div>
  );
};

export default Products;

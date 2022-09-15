import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Dairy from './Dairy';

import { useNavigate } from 'react-router-dom';

const Categories: React.FC<{}> = () => {
  const navigate = useNavigate();
  //const [categories, setCategories] = useState([]);

  return (
    <div>
      <h1>Categories</h1>

      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant='top'
          src='https://media.istockphoto.com/photos/two-dissimilar-brothers-apple-and-pear-picture-id928024768?k=20&m=928024768&s=612x612&w=0&h=rTM0jFFwz2gbf4z8B-EFIz4JozWElc_V9DmO9V5msFU='
        />
        <Card.Body>
          <Card.Title>Fruit</Card.Title>
          <Card.Text>Click here to see our fruit section</Card.Text>
          <Button variant='primary' onClick={() => navigate('/fruit')}>
            Click
          </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant='top'
          src='https://videohive.img.customer.envatousercontent.com/files/bd231196-b79f-4546-93ef-f01ee9953cc3/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=01c4fccc12a8264e1c1b9ffb8853727a'
        />
        <Card.Body>
          <Card.Title>Vegetables</Card.Title>
          <Card.Text>Click here for our veggie section</Card.Text>
          <Button variant='primary' onClick={() => navigate('/vegetables')}>
            Click
          </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant='top'
          src='https://i.pinimg.com/236x/7d/de/b2/7ddeb26af73a9fb874093b38c290904f--dietitian-humor-clean-memes.jpg'
        />
        <Card.Body>
          <Card.Title>Meat</Card.Title>
          <Card.Text>Click here to browse our meat section</Card.Text>
          <Button variant='primary' onClick={() => navigate('/meat')}>
            Click
          </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src='holder.js/100px180' />
        <Card.Body>
          <Card.Title>Dairy</Card.Title>
          <Card.Text>Click here to browse our latest dairy section</Card.Text>
          <Button variant='primary' onClick={() => navigate('/dairy')}>
            Click
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Categories;

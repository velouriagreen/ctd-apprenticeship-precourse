import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface Product {
  id: Number;
  name: String;
  inventory: Number;
  category: String;
  description: String;
  image: String;
}

interface Props {
  setShowModal: (arg1: boolean) => void;
  product: Product;
}

export const Email = ({ setShowModal, product }: Props) => {
  const handleClose = () => setShowModal(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const SERVICE_ID: string | undefined = process.env.REACT_APP_SERVICE_ID;
  const TEMPLATE_ID: string | undefined = process.env.REACT_APP_TEMPLATE_ID;
  const PUBLIC_KEY: string | undefined = process.env.REACT_APP_PUBLIC_KEY;

  const sendEmail = (e: React.SyntheticEvent) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
        setShowSuccessMessage(true);
      },
      (error) => {
        console.log(error.response);
        console.log(error.text);
      }
    );
  };
  console.log(process.env.REACT_APP_TEMPLATE_ID);

  return (
    <div>
      <Modal show={true} onHide={handleClose} centered backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Out of Stock Alert for {product.name}!</Modal.Title>
          {showSuccessMessage === true ? <p>Email successfully sent!</p> : null}
        </Modal.Header>
        <Modal.Body>
          <Form ref={form}>
            <Form.Control
              type='hidden'
              name='product_name'
              value={product.name}
            />
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter email'
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={sendEmail}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Email;

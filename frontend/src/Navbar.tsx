import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar: React.FC<{}> = () => {
  return (
    <div>
      <Navbar bg='dark' variant='light'>
        <Container>
          <Navbar.Brand href='#home'>Piggly Wiggly</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;

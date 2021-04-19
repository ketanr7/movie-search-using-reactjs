import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/buyceps.png';
import smallLogo from '../../assets/TEST.png';
import './header.scss';

const Header = () => (

  <Navbar expand="lg" bg="dark" variant="dark" className="topNavbar" >
    <Navbar.Brand href="#home"><img
      src={logo}
      className="d-inline-block align-top logo"
      alt="React Bootstrap logo"
    />
      <img
        src={smallLogo}
        className="d-inline-block align-top smallLogo"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="#deets">Login</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Sign up
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;



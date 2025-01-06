import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../../images/nexus-lg.png";
import "../../styles/NavMenu.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-1 p-4 text-center">
      <Container>
      <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="nav-section"
    >
      <Container>
        <Navbar.Brand href="/HomePage" className="logo-container ">
          <img
            src={logo}
            className="d-inline-block align-top"
            alt="NexusEvnt Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  className="nav-items">
              Company info
                <Nav.Link href="/HomePage" className="nav-items">
                    FAQ
                </Nav.Link>
                <Nav.Link href="/HomePage" className="nav-items">
                    About
                </Nav.Link>
                <Nav.Link href="/HomePage" className="nav-items">
                    Contact
                </Nav.Link>
            </Nav.Link>
            <Nav.Link  className="nav-items">
              Categories
                <Nav.Link href="/EventPage" className="nav-items">
                    Food and Drink Festivals
                </Nav.Link>
                <Nav.Link href="/EventPage" className="nav-items">
                    Carnivals and Fairs
                </Nav.Link>
                <Nav.Link href="/EventPage" className="nav-items">
                    Art and Craft Fairs
                </Nav.Link>
            </Nav.Link>
            <Nav.Link  className="nav-items">
                About
                    <Nav.Link  href="/AboutPage" className="nav-items">
                     Ticket Support
                    </Nav.Link>
                    <Nav.Link  href="/AboutPage" className="nav-items">
                     Event Support
                    </Nav.Link>
                    <Nav.Link  href="/AboutPage" className="nav-items">
                     Listing Support
                    </Nav.Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/CreateEventPage" className="nav-items">
              Contact
            </Nav.Link>
            <Nav.Link href="/SignInPage" className="nav-items">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Row>
          <Col>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import logo from "../../images/nexus-lg.png";
import "../../styles/NavMenu.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function NavMenu() {
  return (
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
            <Nav.Link href="/HomePage" className="nav-elements">
              Home
            </Nav.Link>
            <Nav.Link href="/EventPage" className="nav-elements">
              Events
            </Nav.Link>
            <Nav.Link href="/AboutPage" className="nav-elements">
              About
            </Nav.Link>
            <Nav.Link href="/ContactPage" className="nav-elements">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/CreateEventPage" className="nav-elements">
              Create Event
            </Nav.Link>
            <Nav.Link href="/SignInPage" className="nav-elements">
              Login
            </Nav.Link>
            <Button href="/SignUpPage" className="singup-button">
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;

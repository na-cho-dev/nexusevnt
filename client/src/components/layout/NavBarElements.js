import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../images/nexus-lg.png";
import "../../styles/NavMenu.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function NavMenu() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="nav-section"
      >
        <Container>
          <Navbar.Brand href="/Home" className="logo-container ">
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="NexusEvnt Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Home" className="nav-elements">
                Home
              </Nav.Link>
              <Nav.Link href="/Event" className="nav-elements">
                Events
              </Nav.Link>
              <Nav.Link href="/About" className="nav-elements">
                About
              </Nav.Link>
              <Nav.Link href="/Contact" className="nav-elements">
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link href="/Profile" className="nav-elements">
                    Profile
                  </Nav.Link>
                  <Nav.Link href="/CreateEvent" className="nav-elements">
                    Create Event
                  </Nav.Link>
                  <Nav.Link href="/Contact" className="nav-elements">
                    Contact
                  </Nav.Link>
                  <Nav.Link href="/Event" className="nav-elements">
                    Events
                  </Nav.Link>
                  <Button
                    onClick={logout}
                    className="logout-button"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link href="/Login" className="nav-elements">
                    Login
                  </Nav.Link>
                  <Button href="/Register" className="singup-button">
                    Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;

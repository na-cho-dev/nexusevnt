import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../images/nexus-lg.png';
import '../../styles/NavMenu.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { useAuth } from '../../context/AuthContext';

function NavMenu() {
  const { userId, userRole } = useAuth();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const logoutRedirect = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout', {
        withCredentials: true,
      });
      console.log(`Logout successful: ${response.data.message}`);
      logout();
      navigate('/login'); // Redirect to the Home page
    } catch (error) {
      console.error(
        'Logout failed:',
        error.response?.data?.message || error.message
      );
    }
  };

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
          <Navbar.Brand href="/home" className="logo-container ">
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="NexusEvnt Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className="nav-elements">
                Home
              </Nav.Link>
              <Nav.Link href="/about" className="nav-elements">
                About
              </Nav.Link>
              <Nav.Link href="/contact" className="nav-elements">
                Contact
              </Nav.Link>
              <Nav.Link href="/events" className="nav-elements">
                Events
              </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link
                    href={`/${userRole.toLowerCase()}/${userId}/profile`}
                    className="nav-elements"
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link href="/create-event" className="nav-elements">
                    Create Event
                  </Nav.Link>
                  <Button onClick={logoutRedirect} className="logout-button">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link href="/login" className="nav-elements">
                    Login
                  </Nav.Link>
                  <Button href="/register" className="singup-button">
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

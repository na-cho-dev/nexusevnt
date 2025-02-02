import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../images/nexus-lg.png";
import "../../styles/NavMenu.css";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-1 p-4 text-center">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <img
              src={logo}
              alt="NexusEvnt Logo"
              className="d-inline-block  logo-container-footer"
              width="250px"
              height="170px"
              object-fit="contain"
            />
          </Col>

          <Col md={8}> 
            <Row className="footer-links">
              <Col>
                <h5>Company Info</h5>
                <ul className="list-unstyled text-deco">
                  <li>
                    <a href="/home" className="text-white">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="/home" className="text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/home" className="text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </Col>

              <Col>
                <h5>Categories</h5>
                <ul className="list-unstyled text-deco">
                  <li>
                    <a href="/events" className="text-white">
                      Food and Drink Festivals
                    </a>
                  </li>
                  <li>
                    <a href="/events" className="text-white">
                      Carnivals and Fairs
                    </a>
                  </li>
                  <li>
                    <a href="/events" className="text-white">
                      Art and Craft Fairs
                    </a>
                  </li>
                </ul>
              </Col>

              <Col>
                <h5>Support</h5>
                <ul className="list-unstyled text-deco">
                  <li>
                    <a href="/about" className="text-white">
                      Ticket Support
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-white">
                      Event Support
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-white">
                      Listing Support
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>&copy; 2025 NexusEvnt. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

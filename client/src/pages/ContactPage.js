import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import NavMenu from "../components/layout/NavBarElements";

const Contact = () => {
  return (
    <div>
      {/* <NavMenu /> */}

      <div
        style={{
          background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          className="shadow-lg rounded"
          style={{ background: "#fff", maxWidth: "900px", overflow: "hidden" }}
        >
          <Row>
            <Col md={6} className="p-0">
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <iframe
                  title="Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5076664.071840458!2d15.613174055302173!3d-4.796205120126479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b4d3cfd9d20e35%3A0x6821c79ac233d5a9!2sAfrica!5e0!3m2!1sen!2sin!4v1618396409175!5m2!1sen!2sin"
                  style={{ border: "0", width: "100%", height: "100%" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </Col>

            <Col md={6} className="p-4">
              <h2 className="mb-4" style={{ textTransform: "uppercase" }}>
                Contact Us
              </h2>
              <div className="mb-4 d-flex justify-content-between">
                <p className="text-muted">
                  <strong style={{ color: " #ff9a9e" }}>A</strong> 767 Fifth
                  Avenue
                  <br />
                  Musina <br /> 93029
                </p>
                <p className="text-muted">
                  <strong style={{ color: " #ff9a9e" }}>T</strong> 1234 5679 10
                  <br />
                  <strong style={{ color: " #ff9a9e" }}>E</strong>{" "}
                  info@nexusevnt.com
                </p>
              </div>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    style={{ borderRadius: "5px", border: "1px solid #fa8072" }}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    style={{ borderRadius: "5px", border: "1px solid #fa8072" }}
                  />
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Message"
                    style={{ borderRadius: "5px", border: "1px solid #fa8072" }}
                  />
                </Form.Group>
                <Button
                  variant="danger"
                  type="submit"
                  style={{
                    backgroundColor: "#fa8072",
                    border: "none",
                    width: "50%",
                    borderRadius: "5px",
                  }}
                >
                  Send
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Contact;

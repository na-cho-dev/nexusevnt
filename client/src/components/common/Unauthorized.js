import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); // Redirect to homepage or any other route you prefer
  };

  return (
    <Container className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "calc(100vh - 100px)" }}>
      <Row className="text-center">
        <Col>
          <h1 className="display-4">Unauthorized</h1>
          <p className="lead">
            You do not have the necessary permissions to view this page.
          </p>
          <Button variant="danger" onClick={handleRedirect}>
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;

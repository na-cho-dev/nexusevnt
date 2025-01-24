import React from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import EventTypeSelector from "../common/TicketType";
import NavMenu from "../layout/NavBarElements";
import Footer from "../layout/Footer";
import Progress from "./Progress";

const Ticketing = () => (
  <>
    <NavMenu />

    <div className="container-md" style={{ height: "850px" }}>
      <h4 className="mt-5 ms-3">Set Up Ticketing</h4>
      <Container className="mt-4">
        <Progress />
      </Container>
      <Form>
        <Form.Group className="mb-2">
          <EventTypeSelector />
        </Form.Group>
        <h5>What tickets are you selling?</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Ticket Type</Form.Label>
              <Form.Control type="text" placeholder="e.g., General Admission" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Ticket Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter ticket price"
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-5 mb-5 text-end">
          <Button variant="secondary" className="me-3" as={Link} to="/Banner">
            Go Back
          </Button>
          <Button as={Link} to="/Review" variant="primary">
            Save & Continue
          </Button>
        </div>
      </Form>
    </div>
    <Footer />
  </>
);

export default Ticketing;

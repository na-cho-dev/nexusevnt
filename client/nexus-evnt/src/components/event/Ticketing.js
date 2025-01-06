import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import EventTypeSelector from "../common/TicketType";

const Ticketing = () => (
  <div>
    <h4 className="mb-4">Set Up Ticketing</h4>
    <Form>
      <Form.Group className="mb-3">
        <EventTypeSelector />
      </Form.Group>
      <h5>What tickets are you selling?</h5>
      <Form.Group className="mb-3">
        <Form.Label>Ticket Type</Form.Label>
        <Form.Control type="text" placeholder="e.g., General Admission" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ticket Price</Form.Label>
        <Form.Control type="number" placeholder="Enter ticket price" />
      </Form.Group>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
      <Button as={Link} to="/Banner" variant="primary">
        Go Back
      </Button>
      <Button as={Link} to="/Review" variant="primary">
        Save & Continue
      </Button>
    </Form>
  </div>
);

export default Ticketing;

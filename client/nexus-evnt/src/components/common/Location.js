import React from "react";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LocationSection = () => {
  return (
    <Container className="mt-4">
      <div className="mb-4">
        <h5 className="mb-3">Location</h5>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="event-location" className="fw-bold">
            Where will your <span className="text-danger">*</span> event take
            place?
          </Form.Label>
          <Form.Control
            as="select"
            id="event-location"
            aria-label="Event Location"
          >
            <option value="" disabled>
              Please select one
            </option>
            <option value="venue1">Venue 1</option>
            <option value="venue2">Venue 2</option>
            <option value="online">Online</option>
          </Form.Control>
        </Form.Group>
      </div>
    </Container>
  );
};

export default LocationSection;

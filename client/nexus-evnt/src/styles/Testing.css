import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Progress from "../../components/event/Progress";
import "../../styles/Edit.css";

const Edit = () => {
  return (
    <div className="container-md">
      <h4 className="mt-5 ms-3">Create a New Event</h4>
      <Container className="mt-4">
        <Progress />
      </Container>

      <Form className="mb-5">
        <h5 className="ms-4-style mb-3 mt-5">Event Details</h5>
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Event Title*</Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Enter the name of your event"
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Event Category*</Form.Label>
          </Col>
          <Col md={8}>
            <Form.Select>
              <option>Please select one</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Education</option>
            </Form.Select>
          </Col>
        </Row>

        <h5 className="ms-4-style mb-3 mt-3">Date & Time</h5>
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Event Type*</Form.Label>
          </Col>
          <Col md={8}>
            <div className="d-inline-flex align-items-center me-4">
              <Form.Check
                inline
                id="singleEvent"
                name="eventType"
                type="radio"
                className="me-2"
              />
              <Form.Label htmlFor="singleEvent" className="mb-0">
                Single Event
              </Form.Label>
            </div>
            <div className="d-inline-flex align-items-center">
              <Form.Check
                inline
                id="recurringEvent"
                name="eventType"
                type="radio"
                className="me-2"
              />
              <Form.Label htmlFor="recurringEvent" className="mb-0">
                Recurring Event
              </Form.Label>
            </div>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center ms-4">
          <Col md={3}>
            <Form.Label className="mb-5 ms-2">Session(s)*</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Label className="ms-4">Start Date*</Form.Label>
            <Form.Control className="ms-4" type="date" />
          </Col>
          <Col md={2}>
            <Form.Label className="ms-4">Start Time*</Form.Label>
            <Form.Control className="ms-4" type="time" />
          </Col>
          <Col md={2}>
            <Form.Label className="ms-4">End Time*</Form.Label>
            <Form.Control className="ms-4" type="time" />
          </Col>
          <Col md={3}>
            <Button variant="outline-primary" className="section-btn  ms-4">
              Add
            </Button>
          </Col>
        </Row>

        <h5 className="ms-4-style mb-3 mt-3">Location</h5>
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Where will your event take place? *</Form.Label>
          </Col>
          <Col md={8}>
            <Form.Select>
              <option>Please select one</option>
              <option>Venue 1</option>
              <option>Venue 2</option>
              <option>Venue 3</option>
            </Form.Select>
          </Col>
        </Row>

        <h5 className="ms-4-style mb-3 mt-3">Additional Information</h5>
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Event Description *</Form.Label>
          </Col>
          <Col md={8}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Describe what's special about your event..."
            />
          </Col>
        </Row>

        <div className="mt-5 me-5-style mb-5 text-end">
          <Button variant="secondary" className="me-3" as={Link} to="/">
            Back
          </Button>
          <Button as={Link} to="/Banner" variant="primary">
            Save & Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Edit;

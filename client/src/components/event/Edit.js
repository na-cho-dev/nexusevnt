import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Progress from "../../components/event/Progress";
// import NavMenu from "../layout/NavBarElements";
import Footer from "../layout/Footer";

import "../../styles/Edit.css";

const Edit = ({ eventData, onUpdate, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  return (
    <>
      {/* <NavMenu /> */}
      <div className="container-md">
        <h4 className="mt-5 ms-3">Create a New Event</h4>
        <Container className="mt-4">
          <Progress currentStep={1} />
        </Container>
        <Form className="mb-5">
          <h5 className="ms-4-style mb-3 mt-5">Event Details</h5>
          <Row className="mb-3 align-items-center">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  placeholder="Enter the name of your event"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 align-items-center">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Event Category</Form.Label>
                <Form.Select
                  name="category"
                  value={eventData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Color Runs">Color Runs</option>
                  <option value="Music Festivals">Music Festivals</option>
                  <option value="Food and Drink Festivals">
                    Food and Drink Festivals
                  </option>
                  <option value="Outdoor Movie Nights">
                    Outdoor Movie Nights
                  </option>
                  <option value="Art and Craft Fairs">
                    Art and Craft Fairs
                  </option>
                </Form.Select>
              </Form.Group>
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
                  value="singleEvent"
                  checked={eventData.eventType === "singleEvent"}
                  onChange={(e) => onUpdate({ eventType: e.target.value })}
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
                  value="recurringEvent"
                  checked={eventData.eventType === "recurringEvent"}
                  onChange={(e) => onUpdate({ eventType: e.target.value })}
                />
                <Form.Label htmlFor="recurringEvent" className="mb-0">
                  Recurring Event
                </Form.Label>
              </div>
            </Col>
          </Row>
          <Row className="mb-3 align-items-center ms-4">
            <Col md={3}>
              <Form.Label className="mb-5 me-4">Session(s)*</Form.Label>
            </Col>
            <Col md={2}>
              <Form.Label className="ms-4">Start Date*</Form.Label>
              <Form.Control
                className="ms-4"
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Label className="ms-4">Start Time*</Form.Label>
              <Form.Control
                className="ms-4"
                type="time"
                name="startTime"
                value={eventData.startTime}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Label className="ms-4">End Time*</Form.Label>
              <Form.Control
                className="ms-4"
                type="time"
                name="endTime"
                value={eventData.endTime}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <h5 className="ms-4-style mb-3 mt-3">Location</h5>
          <Row className="mb-3 align-items-center">
            <Col md={3}>
              <Form.Label>Where will your event take place? *</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Select
                name="location"
                value={eventData.location}
                onChange={handleChange}
              >
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
                name="description"
                value={eventData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe what's special about your event..."
              />
            </Col>
          </Row>

          <div className="mt-5 me-5-style mb-5 text-end">
            <Button variant="secondary" className="me-3" as={Link} to="/">
              Back
            </Button>
            <Button onClick={onNext} variant="primary">
              Save & Continue
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Edit;

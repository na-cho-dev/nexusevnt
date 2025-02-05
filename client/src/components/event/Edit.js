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
  
    // If 'eventType' is changed to 'Free', set the default ticket tier
    if (name === "eventType" && value === "Free") {
      const freeTier = {
        tier_type: "Regular",
        tier_price: "Free",
        total_tickets: eventData.ticket_tiers[0].total_tickets || 0, // Default to 0 if total_tickets is not set
      };
      onUpdate({
        ticket_tiers: [freeTier], // Automatically add the free tier
      });
    }
  
    // Update ticket tier quantity if total_tickets is updated for Free events
    if (name === "total_tickets" && eventData.eventType === "Free") {
      const updatedTier = {
        ...eventData.ticket_tiers[0],
        total_tickets: value, // Update the quantity in the first tier
      };
      onUpdate({
        ticket_tiers: [updatedTier], // Update ticket_tiers array with the new value
      });
    }
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
          <h5 className="mb-3 mt-5">Event Details</h5>
          <Row className="mb-3 align-items-center">
            <Col md={5}>
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
            <Col md={5}>
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
          <Row className="mb-3 align-items-center">
            <Col md={5}>
              <Form.Group>
                <Form.Label>Event Type</Form.Label>
                <Form.Select
                  name="eventType"
                  value={eventData.eventType}
                  onChange={handleChange}
                >
                  <option value="">Select an event type</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {eventData.eventType === "Free" && (
            <>
              <h5 className="mb-3 mt-3">Ticketing Details</h5>
              <Row className="mb-3 align-items-center">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Ticket Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="total_tickets"
                      value={eventData.ticket_tiers[0].total_tickets || ""}
                      onChange={handleChange}
                      placeholder="Enter the total number of tickets"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <h5 className="mb-3 mt-3">Date & Time</h5>
          <Row className="mb-3 align-items-center">
            <Col md={2}>
              <Form.Label className="">Start Date*</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Label className="">Start Time*</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={eventData.startTime}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Label className="">End Time*</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={eventData.endTime}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <h5 className="mb-3 mt-3">Location</h5>
          <Row className="mb-3 align-items-center">
            <Col md={5}>
              <Form.Label>Where will your event take place? *</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                placeholder="Enter the location of your event"
              />
            </Col>
          </Row>

          <h5 className="mb-3 mt-3">Additional Information</h5>
          <Row className="mb-3 align-items-center">
            <Col md={5}>
              <Form.Label>Event Description *</Form.Label>
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

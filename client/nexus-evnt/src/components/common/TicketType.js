import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Free from "../../images/icons8-free-60.png";
import Ticket from "../../images/icons8-ticket-64.png";

const EventTypeSelector = () => {
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleSelect = (eventType) => {
    setSelectedEvent(eventType);
  };

  return (
    <Container className="mt-4">
      <h5 className="mb-4">What type of event are you running?</h5>
      <Row>
        <Col xs={12} sm={6}>
          <Card
            className={`text-center p-3 mb-3 ${
              selectedEvent === "ticketed" ? "border-primary shadow-sm" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelect("ticketed")}
          >
            <Card.Body>
              <Card.Img
                src={Ticket}
                alt="Ticket Icon"
                className="mb-3"
                style={{ width: "50px" }}
              />
              <Card.Title>Ticketed Event</Card.Title>
              <Card.Text>My event requires tickets for entry</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card
            className={`text-center p-3 mb-3 ${
              selectedEvent === "free" ? "border-primary shadow-sm" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelect("free")}
          >
            <Card.Body>
              <Card.Img
                src={Free}
                alt="Free Icon"
                className="mb-3"
                style={{ width: "50px" }}
              />
              <Card.Title>Free Event</Card.Title>
              <Card.Text>I'm running a free event</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventTypeSelector;

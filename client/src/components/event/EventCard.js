import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const EventCard = ({ event }) => {
  return (
    <Card className="mb-4">
      <Card.Img
        src={event.image}
        className="img-fluid"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
        <div className="mb-2">
          <Badge className="custom-badge">{event.category}</Badge>
        </div>
        <Card.Text>
          <strong>Location:</strong> {event.location} <br />
          <strong>Price:</strong>{" "}
          {event.price === 0 ? "FREE" : `INR ${event.price}`}
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;

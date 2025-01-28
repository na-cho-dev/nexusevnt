import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import "../../styles/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="card-display">
      <Card className="card-style">
        <Card.Img
          src={event.image || "placeholder.jpg"} // Fallback if no image
          className="img-fluid"
          style={{ height: "150px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{event.event_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(event.event_date).toLocaleDateString()} {/* Format date */}
          </Card.Subtitle>
          <div className="mb-2">
            <Badge className="custom-badge">
              {event.event_venue || "Venue not specified"}
            </Badge>
          </div>
          <Card.Text>
            <strong>Description:</strong> {event.event_description} <br />
            <strong>Location:</strong> {event.event_location} <br />
            <strong>Start Time:</strong> {event.event_start_time} <br />
            <strong>End Time:</strong> {event.event_end_time} <br />
            <strong>Price:</strong>{" "}
            {event.ticket_tiers?.length > 0
              ? event.ticket_tiers
                  .map(
                    (tier, index) => `Tier ${index + 1}: INR ${tier.price}`
                  )
                  .join(", ")
              : "FREE"}
          </Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventCard;

import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
import "../../styles/EventCard.css";

const EventCard = ({ event }) => {
  // Safely access image data and handle undefined values
  const imageSrc = event.event_image && event.event_image.data
  ? `data:${event.event_image.mimeType};base64,${event.event_image.data}`
  : null;

  // console.log("Generated Image Source:", imageSrc); // Debug log
  // console.log("Event Data:", event.event_image?.data);
  // console.log("Event MimeType:", event.event_image?.mimeType);

  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formattedStartTime = new Date(event.event_start_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  
  const formattedEndTime = new Date(event.event_end_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  console.log(event.ticket_tiers)

  return (
    <div className="card-display">
      <Card className="card-style">
        {imageSrc && (
          <Card.Img
            src={imageSrc}
            className="img-fluid"
            style={{ height: "150px", objectFit: "cover" }}
          />
        )}

        
        <Card.Body className="text-start w-100">
          <Card.Title>{event.event_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(formattedDate).toLocaleDateString()} {/* Format date */}
          </Card.Subtitle>
          <div className="mb-2">
            <Badge className="custom-badge">
              {event.event_location || "Venue not specified"}
            </Badge>
          </div>
          <div className="event-card">
            <strong>Start Time:</strong> {formattedStartTime} <br />
            <strong>End Time:</strong> {formattedEndTime} <br />

            <strong>Price:</strong>
            {event.ticket_tiers?.length > 0 ? (
              <ul className="price-list">
                {event.ticket_tiers.map((tier, index) => (
                  <li key={index}>
                    <strong>{tier.tier_type}</strong>: ${tier.tier_price}
                  </li>
                ))}
              </ul>
            ) : (
              "FREE"
            )}
          </div>

          <Button as={Link} to={`/Events/${event._id}`} variant="primary">
            View Details
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventCard;

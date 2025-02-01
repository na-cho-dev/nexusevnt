import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { Card, Button, Spinner, Badge } from "react-bootstrap";
import "../../styles/EventDetails.css"; // Ensure styling is imported
// import Footer from "../layout/Footer";

const EventDetails = () => {
  const { event_id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/api/events/${event_id}`);
        console.log("API Response:", response.data); 
        setEvent(response.data.event);
      } catch (error) {
        console.error("Error fetching event details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [event_id]);

  // Show spinner while loading
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "calc(100vh - 100px)" }}>
        <Spinner animation="border" />
      </div>
    );

  // Centered "Event Not Found"
  if (!event)
    return <div className="d-flex justify-content-center align-items-center"
  style={{ minHeight: "calc(100vh - 100px)" }}>Failed to fetch Events.</div>;

  const imageSrc = event.event_image && event.event_image.data
  ? `data:${event.event_image.mimeType};base64,${event.event_image.data}`
  : null;

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

  return (
    <div className="event-details-container">
      <Card className="event-details-card mt-4 mb-4">
        {imageSrc && (
            <Card.Img
            src={imageSrc}
            className="img-fluid"
            style={{ height: "250px", objectFit: "cover" }}
            />
        )}

        <Card.Body>
          <Card.Title className="text-center">{event.event_name}</Card.Title>
          <div className="text-center">
            <Badge className="category-badge">{event.event_category}</Badge>
          </div>

          <Card.Text>
            <strong>Event Type:</strong> {event.event_type} <br />
            <strong>Date:</strong> {formattedDate} <br />
            <strong>Start Time:</strong> {formattedStartTime} <br />
            <strong>End Time:</strong> {formattedEndTime} <br />
            <strong>Location:</strong> {event.event_location} <br />
          </Card.Text>

          <Card.Text>
            <strong>Description:</strong> <br />
            {event.event_description}
          </Card.Text>

          <hr />

          {/* Ticket Tiers */}
          <h5>Ticket Information</h5>
          {event.ticket_tiers?.length > 0 ? (
            <ul>
              {event.ticket_tiers.map((tier, index) => (
                <li key={index}>
                  <strong>{tier.tier_type}</strong> - ${tier.tier_price} ({tier.total_tickets} tickets available)
                </li>
              ))}
            </ul>
          ) : (
            <p>No tickets available (Free event)</p>
          )}

          <div className="text-center mt-3">
            <Link to={`/booking/${event_id}`} state={{ event }}>
              <Button variant="primary">Book Now</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
      {/* <Footer /> */}
    </div>
  );
};

export default EventDetails;

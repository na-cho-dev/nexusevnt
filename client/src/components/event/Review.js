import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Progress from "./Progress";
import Footer from "../layout/Footer";

const Review = ({ eventData, onEdit, onSubmit }) => {
  const {
    title,
    category,
    date,
    startTime,
    endTime,
    eventType,
    location,
    description,
    ticket_tiers,
    banner,
  } = eventData;

  return (
    <>
      <Container className="mt-5">
        <div className="p-4 shadow">
          <Card.Body>
            <h4 className="mt-5 ms-3">Review Your Event</h4>
            <Container className="mt-4">
              <Progress currentStep={4} />
            </Container>

            {banner && (
              <div className="text-center mb-4 mt-4">
                <img
                  src={banner}
                  alt="Event Banner"
                  className="rounded w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </div>
            )}

            <Row className="mt-4">
              <Col>
                <p>
                  <strong>Title:</strong> {title || "N/A"}
                </p>
                <p>
                  <strong>Category:</strong> {category || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong> {date || "N/A"}
                </p>
                <p>
                  <strong>Event Type:</strong>{" "}
                  {eventType === "singleEvent" ? "Single Event" : "Recurring Event"}
                </p>
                <p>
                  <strong>Start Time:</strong> {startTime || "N/A"}
                </p>
                <p>
                  <strong>End Time:</strong> {endTime || "N/A"}
                </p>
                <p>
                  <strong>Location:</strong> {location || "N/A"}
                </p>
                <p>
                  <strong>Description:</strong> {description || "N/A"}
                </p>
              </Col>
            </Row>

            <h5 className="mt-4">Tickets</h5>
            {eventType === "Free" ? (
              // For free events, show the ticket quantity from the first ticket tier
              ticket_tiers && ticket_tiers.length > 0 ? (
                <Row className="mb-3">
                  <Col>
                    <p>
                      <strong>Quantity:</strong> {ticket_tiers[0].total_tickets || "N/A"}
                    </p>
                  </Col>
                </Row>
              ) : (
                <p>No ticket tiers added.</p>
              )
            ) : ticket_tiers && ticket_tiers.length > 0 ? (
              // For paid events, show the ticket tiers
              ticket_tiers.map((tier, index) => (
                <Row key={index} className="mb-3">
                  <Col>
                    <p>
                      <strong>Type:</strong> {tier.tier_type}
                    </p>
                  </Col>
                  <Col>
                    <p>
                      <strong>Price:</strong> ${tier.tier_price || "Free"}
                    </p>
                  </Col>
                  <Col>
                    <p>
                      <strong>Quantity:</strong> {tier.total_tickets || "N/A"}
                    </p>
                  </Col>
                </Row>
              ))
            ) : (
              <p>No ticket tiers added.</p>
            )}

            <div className="mt-5 me-5-style mb-5 text-end">
              <Button variant="outline-secondary" onClick={onEdit} className="me-3">
                Edit Details
              </Button>
              <Button variant="primary" onClick={onSubmit}>
                Publish Event
              </Button>
            </div>
          </Card.Body>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Review;

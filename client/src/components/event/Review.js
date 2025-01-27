import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Progress from "./Progress";
// import NavMenu from "../layout/NavBarElements";
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
    ticketType,
    ticketPrice,
    ticketQuantity,
    banner,
  } = eventData;

  return (
    <>
      {/* <NavMenu /> */}

      <Container className="mt-5">
        <div className="p-4 shadow">
          <Card.Body>
            <h4 className="mt-5 ms-3">Review Your Event</h4>
            <Container className="mt-4">
              <Progress currentStep={4} />
            </Container>

            {banner && (
              <div className="text-center mb-4">
                <img
                  src={banner}
                  alt="Event Banner"
                  className="rounded w-100"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </div>
            )}

            <Row>
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
                  {eventType === "singleEvent"
                    ? "Single Event"
                    : "Recurring Event"}
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

            <Row>
              <Col>
                <p>
                  <strong>Ticket Type:</strong> {ticketType || "N/A"}
                </p>
                <p>
                  <strong>Ticket Price:</strong>{" "}
                  {ticketPrice ? `$${ticketPrice}` : "Free"}
                </p>
                <p>
                  <strong>Quantity:</strong> {ticketQuantity || "N/A"}
                </p>
              </Col>
            </Row>

            <div className="mt-5 me-5-style mb-5 text-end">
              <Button
                variant="outline-secondary"
                onClick={onEdit}
                className="me-3"
              >
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

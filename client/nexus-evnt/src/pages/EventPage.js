import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Dropdown,
} from "react-bootstrap";
import Img from "../images/wedding.jpg";
import NavMenu from "../components/layout/NavBarElements";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/EventPage.css";

const Event = () => {
  const [sortOption, setSortOption] = useState("Relevance");
  const [events, setEvents] = useState([
    {
      image: Img,
      title: "Delhi 6 - Traditional Food",
      date: "2023-11-23",
      location: "Chengalpattu, India",
      price: 1200,
      category: "Food & Drink",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 0,
      category: "Educational & Business",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 0,
      category: "Educational & Business",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 0,
      category: "Educational & Business",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 0,
      category: "Educational & Business",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 0,
      category: "Educational & Business",
    },
    // Add more events...
  ]);

  // Handle Sorting
  const handleSort = (option) => {
    setSortOption(option);

    // Sort events based on the selected option
    const sortedEvents = [...events];
    if (option === "Price: Low to High") {
      sortedEvents.sort((a, b) => a.price - b.price);
    } else if (option === "Price: High to Low") {
      sortedEvents.sort((a, b) => b.price - a.price);
    } else if (option === "Date: Soonest") {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setEvents(sortedEvents);
  };

  return (
    <Container className="" fluid>
      <Row className="mb-3">
        <Col>
          <h5>Events</h5>
        </Col>
        <Col className="text-end">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              Sort by: {sortOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort("Relevance")}>
                Relevance
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Price: Low to High")}>
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Price: High to Low")}>
                Price: High to Low
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Date: Soonest")}>
                Date: Soonest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        {events.map((event, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className=" ">
              <Card.Img
                // variant="top"
                src={Img}
                className="img-fluid "
                style={{ height: "150px", objectFit: "cover" }}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {event.date}
                </Card.Subtitle>
                <div className="mb-2">
                  <Badge
                    bg={
                      event.category === "Food & Drink" ? "success" : "primary"
                    }
                  >
                    {event.category}
                  </Badge>
                </div>

                <Card.Text>
                  <strong>Location:</strong> {event.location} <br />
                  <strong>Price:</strong>{" "}
                  {event.price === 0 ? "FREE" : `INR ${event.price}`}
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Event;

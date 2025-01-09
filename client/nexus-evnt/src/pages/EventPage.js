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

const Event = () => {
  const events = [
    {
      image: Img,
      title: "Delhi 6 - Traditional Food",
      date: "Nov 23 - 29",
      location: "Chengalpattu, India",
      price: "INR 1200",
      category: "Food & Drink",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "Dec 17",
      location: "New Delhi, India",
      price: "FREE",
      category: "Educational & Business",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "Dec 17",
      location: "New Delhi, India",
      price: "FREE",
      category: "Educational & Business",
    },
  ];

  return (
    <div className="main-container">
      <NavMenu />
      <Header />

      <Container fluid className="sub-container">
        <Row>
          {/* Filters Section */}
          <Col md={3} className="bg-light p-3">
            <h5 className="fs-2">Filters</h5>
            <Form>
              <Form.Group>
                <Form.Label className="mt-3 fw-semibold">Price</Form.Label>
                <Form.Check className="mt-2" type="checkbox" label="Free" />
                <Form.Check type="checkbox" label="Paid" />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label className="mt-3 fw-semibold">Date</Form.Label>
                <Form.Check className="mt-2" type="checkbox" label="Today" />
                <Form.Check type="checkbox" label="Tomorrow" />
                <Form.Check type="checkbox" label="This Week" />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Label className="mt-3 fw-semibold">Category</Form.Label>
                <Form.Check
                  className="mt-2"
                  type="checkbox"
                  label="Color Runs"
                />
                <Form.Check type="checkbox" label="Food and Drink Festival" />
                <Form.Check type="checkbox" label="Music Festival" />
                <Form.Check type="checkbox" label="Carnival and Fairs" />
                <Form.Check type="checkbox" label="Outdoor Movie Nights" />
                <Form.Check type="checkbox" label="Art and Craft Fair" />
              </Form.Group>
            </Form>
          </Col>

          {/* Main Content Section */}
          <Col md={9}>
            <Row>
              {events.map((event, index) => (
                <Col md={6} lg={4} key={index} className="mb-4">
                  <Card>
                    <Card.Img
                      // variant="top"
                      src={Img}
                      className="img-fluid"
                      style={{ height: "150px", objectFit: "cover" }}
                    ></Card.Img>
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {event.date}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Location:</strong> {event.location} <br />
                        <strong>Price:</strong> {event.price}
                        <div className="mb-2">
                          <Badge bg="info">{event.category}</Badge>
                        </div>
                      </Card.Text>
                      <Button variant="primary">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Event;

import React, { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import EventTypeSelector from "../common/TicketType";
import Progress from "./Progress";
import NavMenu from "../layout/NavBarElements";
import Footer from "../layout/Footer";

const Ticketing = ({ eventData, onUpdate, onNext, onBack }) => {
  const [ticket, setTicket] = useState({
    ticketType: eventData.ticketType || "",
    ticketPrice: eventData.ticketPrice || "",
    ticketQuantity: eventData.ticketQuantity || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSave = () => {
    onUpdate(ticket);
    onNext();
  };

  return (
    <>
      <NavMenu />
      <div>
        <h4 className="mb-4">Set Up Ticketing</h4>
        <Container className="mt-4">
          <Progress />
        </Container>
        <Form>
          <Form.Group className="mb-3">
            <EventTypeSelector />
          </Form.Group>
          <h5>What tickets are you selling?</h5>

          <Form.Group className="mb-3">
            <Form.Label>Ticket Type</Form.Label>
            <Form.Control
              type="text"
              name="ticketType"
              value={ticket.ticketType}
              onChange={handleChange}
              placeholder="e.g., General Admission"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ticket Price ($)</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="ticketPrice"
                value={ticket.ticketPrice}
                onChange={handleChange}
                placeholder="Enter ticket price"
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ticket Quantity</Form.Label>
            <Form.Control
              type="number"
              name="ticketQuantity"
              value={ticket.ticketQuantity}
              onChange={handleChange}
              placeholder="Number of tickets"
            />
          </Form.Group>

          <div className="mt-5 me-5-style mb-5 text-end">
            <Button variant="secondary" onClick={onBack} className="me-3">
              Go Back to Upload Banner
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save & Continue
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Ticketing;

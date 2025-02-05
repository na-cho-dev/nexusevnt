import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import Progress from "./Progress";
import Footer from "../layout/Footer";

const Ticketing = ({ eventData, onUpdate, onNext, onBack }) => {
  const [tickets, setTickets] = useState(
    eventData.ticket_tiers || [
      { tier_type: "Regular", tier_price: "", total_tickets: "" },
    ]
  );

  // Track selected ticket types to prevent duplicates
  const selectedTicketTypes = tickets.map((ticket) => ticket.tier_type);

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = tickets.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket
    );
    setTickets(updatedTickets);
  };

  const addTicketTier = () => {
    if (tickets.length < 3) {
      setTickets([
        ...tickets,
        { tier_type: "", tier_price: "", total_tickets: "" },
      ]);
    } else {
      alert("You can only add up to 3 ticket tiers.");
    }
  };

  const removeTicketTier = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  const handleSave = () => {
    onUpdate({ ...eventData, ticket_tiers: tickets });
    onNext();
  };

  return (
    <>
      <div className="container-md">
        <h4 className="mt-5 ms-3">Set Up Ticketing</h4>
        <Container className="mt-4">
          <Progress currentStep={3} />
        </Container>
        <Form>
          <h5 className="mt-5 ms-4 mb-4">What tickets are you selling?</h5>

          {tickets.map((ticket, index) => (
            <div key={index} className="mb-4">
              <Row className="align-items-center">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Ticket Type</Form.Label>
                    <Form.Select
                      name="tier_type"
                      value={ticket.tier_type}
                      onChange={(e) =>
                        handleTicketChange(index, "tier_type", e.target.value)
                      }
                    >
                      <option value="">Select a Ticket Tier</option>
                      {["Regular", "VIP", "VVIP"].map((type) => (
                        <option
                          key={type}
                          value={type}
                          disabled={selectedTicketTypes.includes(type)} // Disable selected types
                        >
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Ticket Price ($)</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        name="tier_price"
                        value={ticket.tier_price}
                        onChange={(e) =>
                          handleTicketChange(index, "tier_price", e.target.value)
                        }
                        placeholder="Enter ticket price"
                      />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Ticket Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="total_tickets"
                      value={ticket.total_tickets}
                      onChange={(e) =>
                        handleTicketChange(
                          index,
                          "total_tickets",
                          e.target.value
                        )
                      }
                      placeholder="Number of tickets"
                    />
                  </Form.Group>
                </Col>

                <Col md={2} className="d-flex align-items-end mt-3">
                  <Button
                    variant="danger"
                    onClick={() => removeTicketTier(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          ))}

          <Button variant="success" onClick={addTicketTier} className="mb-4">
            + Add Another Ticket Tier
          </Button>

          <div className="mt-5 me-5 mb-5 text-end">
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

import React, { useState } from "react";
import "../styles/BookingPage.css";
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import Close from "../components/common/CloseButton";
// import NavMenu from "../components/layout/NavBarElements";
import { Link, useLocation, useParams } from "react-router-dom";

const Booking = () => {
  const { event_id } = useParams();
  const [ticketType, setTicketType] = useState("Regular");
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const event = location.state?.event; // Retrieve event details

  if (!event) {
    return <p className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "calc(100vh - 100px)" }}>No event details found.</p>;
  }

  const ticketPrices = {
    "Select Ticket": 0,
    "Regular": event.ticket_tiers[0].tier_price,
    "VIP": event.ticket_tiers[1]?.tier_price,
    "VVIP": event.ticket_tiers[2]?.tier_price,
  };

  const pricePerTicket = ticketPrices[ticketType];

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const total = (quantity * pricePerTicket).toFixed(2)

  return (
    <div>
      {/* <NavMenu /> */}
      <div
        className="ticket-section"
        style={{ maxWidth: "800px", margin: "auto", minHeight: "calc(100vh - 100px)" }}
      >
        <Card className="ticket-container">
          <Close />
          <Card.Header className="h3">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="btn-dropdown">
              {ticketType}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(ticketPrices).map((type) => (
                <Dropdown.Item 
                  key={type} 
                  onClick={() => setTicketType(type)}
                  disabled={event.event_type === "Free" && type !== "Regular Ticket"} // Disable other tickets
                >
                  {type}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          </Card.Header>
          <Card.Body>
            <Row className="align-items-center">
              <Col>
                <div>
                  {ticketType} <br />
                  Price: ${pricePerTicket.toFixed(2)}
                </div>
              </Col>
              <Col>
                <InputGroup>
                  <Button variant="outline-secondary" onClick={decrement}>
                    -
                  </Button>
                  <FormControl
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    style={{ textAlign: "center" }}
                  />
                  <Button variant="outline-secondary" onClick={increment}>
                    +
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>Qty: {quantity}</Col> 
              <Col>Total: ${total}</Col>
            </Row>
            <Link to={`/attendee-details/${event_id}`} state={{ event_id, quantity, total, ticketType }}>
              <Button variant="dark" className="w-100 mt-2">
                Proceed &gt;
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Booking;

import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../../styles/OrderSummary.css"; 
import { Link } from "react-router-dom";

function OrderSummary() {
  const ticketPrice = 200;
  const tax = 11.8;
  const total = ticketPrice + tax;

  return (
    <div
    className="order-section"
    style={{ maxWidth: "600px", margin: "auto" }}
    >
    <div className="order-summary-container">
      <div className="header">
        <Button variant="link" className="back-button">&lt; Back</Button>
        <h4>Order Summary</h4>
      </div>

      {/* Ticket Card */}
      <div className="ticket-section">
        <Card className="ticket-card">
          <Card.Body>
            <div className="ticket-info">
              <h5 className="ticket-type">Standard Ticket</h5>
              <p className="ticket-holder">Andrea Gomes</p>
              <p className="ticket-email">andreagomes@example.com</p>
            </div>
            <div className="ticket-price">
              <h6>₹200</h6>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="summary-section">
        <Row className="summary-row">
          <Col>Sub Total:</Col>
          <Col className="text-end">₹{ticketPrice.toFixed(2)}</Col>
        </Row>
        <Row className="summary-row">
          <Col>Tax:</Col>
          <Col className="text-end">₹{tax.toFixed(2)}</Col>
        </Row>
        <Row className="summary-row total-row">
          <Col><strong>Order Total:</strong></Col>
          <Col className="text-end"><strong>₹{total.toFixed(2)}</strong></Col>
        </Row>
        {/* <Button variant="success" className="pay-now-button w-100 mt-3">
          <span className="lock-icon">🔒</span> Pay Now
        </Button> */}
        <Link>
              <Button variant="success" className="pay-now-button w-100 mt-3">
                    <span className="lock-icon">🔒</span> Pay Now
              </Button>
           </Link>
      </div>
    </div>
    </div>
  );
}

export default OrderSummary;

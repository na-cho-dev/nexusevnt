import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import "../../styles/OrderSummary.css";
import Close from "../../components/common/CloseButton";
import NavMenu from "../../components/layout/NavBarElements";
import { Link } from "react-router-dom";

function OrderSummary() {
  const ticketPrice = 200;
  const tax = 11.8;
  const total = ticketPrice + tax;

  return (
    <div>
      <NavMenu />
      <div
        className="order-section"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        {/* <div className="order-summary-container"> */}

        {/* <div className="ticket-section"> */}
        <Card className="ticket-card">
          <Close />
          <Card.Header>Order Summary</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3 w-100" controlId="formGroupUserName">
                <Form.Label className="ticket-type">Standard Ticket</Form.Label>

                <Form.Label className="ticket-holder">Andrea Gomes</Form.Label>

                <Form.Label className="ticket-email">
                  andreagomes@example.com
                </Form.Label>
              </Form.Group>
              <div className="ticket-price">
                <h6>₹200</h6>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer>
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
                <Col>
                  <strong>Order Total:</strong>
                </Col>
                <Col className="text-end">
                  <strong>₹{total.toFixed(2)}</strong>
                </Col>
              </Row>
              <Link to="/">
                <Button variant="success" className="pay-now-button w-100 mt-3">
                  <span className="lock-icon">🔒</span> Pay Now
                </Button>
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default OrderSummary;

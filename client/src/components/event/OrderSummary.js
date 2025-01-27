import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import "../../styles/OrderSummary.css";
import Close from "../../components/common/CloseButton";
// import NavMenu from "../../components/layout/NavBarElements";
import { Link } from "react-router-dom";

function OrderSummary() {
  const ticketPrice = 200;
  const tax = 14.0;
  const total = ticketPrice + tax;

  return (
    <div>
      {/* <NavMenu /> */}
      <div
        className="order-section"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <Card className="ticket-container">
          <Close />
          <Card.Header className="h3">Order Summary</Card.Header>
          <Card.Body>
            <Form>
              <Row className="align-items-center">
                <Form.Group
                  className="mb-3 w-100"
                  controlId="formGroupUserName"
                >
                  <Col>
                    <Form.Label className="ticket-type text-center">
                      Standard Ticket
                    </Form.Label>
                  </Col>
                </Form.Group>
                <div className="ticket-details">
                  <p className="ticket-holder">Andrea Gomes</p>
                  <p className="ticket-email">andreagomes@example.com</p>
                </div>
                <div className="ticket-price">
                  <h6>₹200</h6>
                </div>
              </Row>
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

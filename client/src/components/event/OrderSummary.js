import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import '../../styles/OrderSummary.css';
import Close from '../../components/common/CloseButton';
// import NavMenu from "../../components/layout/NavBarElements";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';

function OrderSummary() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const full_name = location.state?.full_name;
  const email = location.state?.email;
  const subTotal = location.state?.total;
  const ticket_price = location.state?.ticket_price;
  const quantity = location.state?.quantity;
  const order_id = location.state?.order_id;
  const ticket_id = location.state?.ticket_id;
  const tax = 14;
  const total = Number(subTotal) + tax;

  const handlePayment = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('ticket_id', ticket_id);

      // API request
      const response = await axiosInstance.post(
        `/api/create-payment-session`,
        formData
      );

      // console.log('Response:', response);
      // console.log('Ticket data:', response.data);
      // console.log('Ticket:', response.data.ticket);

      console.log(`Payment Session Created: `, response.data);
      // navigate(``);
    } catch (error) {
      console.error(
        'Error Creating Ticket:',
        error.response?.data?.error || error.response?.data?.message
      );

      setErrorMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <div>
      {/* <NavMenu /> */}
      <div
        className="order-section"
        style={{
          maxWidth: '800px',
          margin: 'auto',
          minHeight: 'calc(100vh - 100px)',
        }}
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
                  <p className="ticket-holder">{full_name}</p>
                  <p className="ticket-email">{email}</p>
                </div>
                <p className="order-id mt-4">Order ID: {order_id}</p>
                <div className="d-flex justify-content-between mt-3">
                  <span>Qty: {quantity}</span>
                  <span>Total: ${ticket_price}</span>
                </div>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="summary-section">
              <Row className="summary-row">
                <Col>Sub Total:</Col>
                <Col className="text-end">${subTotal}</Col>
              </Row>
              <Row className="summary-row">
                <Col>Tax:</Col>
                <Col className="text-end">${tax.toFixed(2)}</Col>
              </Row>
              <Row className="summary-row total-row">
                <Col>
                  <strong>Order Total:</strong>
                </Col>
                <Col className="text-end">
                  <strong>${total.toFixed(2)}</strong>
                </Col>
              </Row>
              <Button
                onClick={handlePayment}
                variant="success"
                className="pay-now-button w-100 mt-3"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span>
                    <span className="lock-icon">🔒</span> Pay Now
                  </span>
                )}
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default OrderSummary;

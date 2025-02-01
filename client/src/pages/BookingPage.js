import React, { useState } from 'react';
import '../styles/BookingPage.css';
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Dropdown,
  Spinner,
} from 'react-bootstrap';
import Close from '../components/common/CloseButton';
// import NavMenu from "../components/layout/NavBarElements";
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { event_id } = useParams();
  const [ticketType, setTicketType] = useState('Regular');
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const event = location.state?.event; // Retrieve event details
  const [errorMessage, setErrorMessage] = useState('');

  if (!event) {
    return (
      <p
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: 'calc(100vh - 100px)' }}
      >
        No event details found.
      </p>
    );
  }

  const ticketPrices = {
    'Select Ticket': 0,
    Regular: event.ticket_tiers[0].tier_price,
    VIP: event.ticket_tiers[1]?.tier_price,
    VVIP: event.ticket_tiers[2]?.tier_price,
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

  const total = (quantity * pricePerTicket).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');

      const formData = new FormData();
      formData.append('tier_type', ticketType);
      formData.append('quantity', quantity);

      // console.log(`Form Data: ${formData}`);

      // API request
      const response = await axiosInstance.post(
        `/api/events/${event_id}/create-ticket`,
        formData
      );

      // console.log('Response:', response);
      // console.log('Ticket data:', response.data);
      // console.log('Ticket:', response.data.ticket);

      const ticket_data = response.data.ticket;

      const state = {
        total,
        order_id: ticket_data.order_id,
        ticket_id: ticket_data._id,
        full_name: ticket_data.attendee_full_name,
        email: ticket_data.attendee_email,
        ticket_price: pricePerTicket,
        quantity,
      };

      console.log(`Ticket created successfully:`, ticket_data);
      navigate(`/event/${event_id}/order-summary`, { state });
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
        className="ticket-section"
        style={{
          maxWidth: '800px',
          margin: 'auto',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <Card className="ticket-container">
          <Close />
          <Card.Header className="h3">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="btn-dropdown"
              >
                {ticketType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(ticketPrices).map((type) => (
                  <Dropdown.Item
                    key={type}
                    onClick={() => setTicketType(type)}
                    disabled={
                      event.event_type === 'Free' && type !== 'Regular Ticket'
                    } // Disable other tickets
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
                    style={{ textAlign: 'center' }}
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
            <Button
              onClick={handleSubmit}
              variant="dark"
              className="w-100 mt-2"
              disabled={loading}
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
                'Continue to Checkout >'
              )}
            </Button>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Booking;

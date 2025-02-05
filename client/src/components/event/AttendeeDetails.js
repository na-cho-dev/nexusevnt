import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import Close from '../../components/common/CloseButton';
import '../../styles/AttendeeDetails.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quantity = location.state?.quantity;
  const total = location.state?.total;
  const event_id = location.state?.event_id;
  const tier_type = location.state?.ticketType;
  const ticket_price = total / quantity;

  // Load saved data from local storage if available
  const [fullName, setFullName] = useState('' || '');
  const [email, setEmail] = useState('' || '');
  const [phone, setPhone] = useState('' || '');

  // // Save data to local storage when inputs change
  // useEffect(() => {
  //   localStorage.setItem('fullName', fullName);
  //   localStorage.setItem('email', email);
  //   localStorage.setItem('phone', phone);
  // }, [fullName, email, phone]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const formData = new FormData();
      formData.append('tier_type', tier_type);
      formData.append('quantity', quantity);

      // console.log(`Form Data: ${formData}`)

      // API request
      const response = await axiosInstance.post(
        `/api/events/${event_id}/create-ticket`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const state = { total, fullName, email, ticket_price, quantity };

      console.log(`Ticket created successfully: ${response.data.ticket}`);
      navigate(`/event/${event_id}/order-summary`, { state });
    } catch (error) {
      console.error(
        'Error Creating Ticket:',
        error.response?.data?.error || error.response?.data?.message
      );
    }
  };

  return (
    <div>
      <div
        className="attendee-section"
        style={{
          maxWidth: '800px',
          margin: 'auto',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <Card className="attendee-container">
          <Close />
          <Card.Header className="h3">Attendee Details</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3 w-100" controlId="formGroupUserName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 w-100" controlId="formGroupEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 w-100" controlId="formGroupPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between">
              <span>Qty: {quantity}</span>
              <span>Total: ${total}</span>
            </div>
            {/* <Link to="/OrderSummary" state={{ total, fullName, email, ticket_price, quantity }}>
              <Button onClick={onSubmit} variant="dark" className="w-100 mt-2">
                Continue to Checkout &gt;
              </Button>
            </Link> */}
            <Button
              onClick={handleSubmit}
              variant="dark"
              className="w-100 mt-2"
            >
              Continue to Checkout &gt;
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;

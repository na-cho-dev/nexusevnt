import React, { useState, useEffect } from 'react';
import { Card, Table, Spinner, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import Footer from '../layout/Footer';
import { useAuth } from '../../context/AuthContext';

const UserTickets = () => {
  const navigate = useNavigate();
  const { userRole, userId } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get(`/api/${userRole.toLowerCase()}/${userId}/tickets`);
        setTickets(response.data.tickets);
      } catch (error) {
        console.log('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId, userRole]);

  const handlePayment = (ticket) => {
    console.log(`Redirecting to payment for ticket ID: ${ticket._id}`);
    const state = {
      total: ticket.price_paid * ticket.quantity,
      order_id: ticket.order_id,
      ticket_id: ticket._id,
      full_name: ticket.user_full_name,
      email: ticket.user_email,
      ticket_price: ticket.price_paid,
      quantity: ticket.quantity,
    };
    navigate(`/event/${ticket.event_id}/order-summary`, { state });
  };

  return (
    <div>
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 300px)' }}>
        <div className="bg-body-secondary pt-5 p-3" style={{ width: '280px' }}>
          <h5 className="text-center p-2">Account Settings</h5>
          <div className="list-group">
            <Link to={`/${userRole.toLowerCase()}/${userId}/profile`} className="list-group-item list-group-item-action">Account Info</Link>
            <Link to={`/${userRole.toLowerCase()}/${userId}/events`} className="list-group-item list-group-item-action">My Events</Link>
            <Link to={`/${userRole.toLowerCase()}/${userId}/tickets`} className="list-group-item list-group-item-action active">My Tickets</Link>
            <Link to={`/${userRole.toLowerCase()}/${userId}/change-email`} className="list-group-item list-group-item-action">Change Email</Link>
            <Link to={`/${userRole.toLowerCase()}/${userId}/change-password`} className="list-group-item list-group-item-action">Change Password</Link>
          </div>
        </div>

        <div className="mt-4" style={{ width: 'calc(100% - 300px)' }}>
          <div className="p-4" style={{ width: '100%' }}>
            <h4>My Tickets</h4>
            <hr />
            {loading ? (
              <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
                <Spinner animation="border" variant="primary" />
                <p className="mt-4">Loading tickets...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
                <p>No tickets found.</p>
              </div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Tier</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={ticket._id}>
                      <td>{index + 1}</td>
                      <td>{ticket.event_name}</td>
                      <td>{new Date(ticket.event_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                      <td>{ticket.tier_type}</td>
                      <td>{ticket.quantity}</td>
                      <td>${(ticket.price_paid * ticket.quantity).toFixed(2)}</td>
                      <td>{ticket.payment_status}</td>
                      <td>
                        {ticket.payment_status === 'Pending' ? (
                          <Button style={{color: "white"}} variant="warning" size="sm" onClick={() => handlePayment(ticket)}>Pay Now</Button>
                        ) : (
                          <span className="text-success">Paid</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserTickets;

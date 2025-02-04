import React, { useState, useEffect } from 'react';
import { Card, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import Footer from '../layout/Footer';
import { useAuth } from '../../context/AuthContext';

const UserTickets = () => {
  const { userRole, userId } = useAuth();
const [tickets, setTickets] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTickets = async () => {
    try {
      console.log(`/api/${userRole.toLowerCase()}/${userId}/tickets`);
      const response = await axiosInstance.get(`/api/${userRole.toLowerCase()}/${userId}/tickets`);
      
      console.log("User Tickets", response.data.tickets);
      
      // Correctly updating the state
      setTickets(response.data.tickets); 

    } catch (error) {
      console.log('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchTickets();
}, [userId]);

// Log state only after it updates
useEffect(() => {
  console.log("User Ticket Set", tickets);
}, [tickets]);

  return (
    <div className="">
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 300px)' }}>
        {/* Left Sidebar */}
        <div className="bg-body-secondary pt-5 p-3" style={{ width: '280px' }}>
          <h5 className="text-center p-2">Account Settings</h5>
          <div className="list-group">
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/profile`}
              className="list-group-item list-group-item-action"
            >
              Account Info
            </Link>
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/tickets`}
              className="list-group-item list-group-item-action active"
            >
              My Tickets
            </Link>
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/change-email`}
              className="list-group-item list-group-item-action"
            >
              Change Email
            </Link>
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/change-password`}
              className="list-group-item list-group-item-action"
            >
              Password
            </Link>
            
          </div>
        </div>

        {/* Tickets Section */}
        <div className="mt-4" style={{ width: 'calc(100% - 280px)' }}>
          <div className="p-4" style={{ width: '100%' }}>
            <h4>My Tickets</h4>
            <hr />
            {loading ? (
              <div
              className="text-center d-flex flex-column justify-content-center align-items-center"
              style={{ minHeight: 'calc(100vh - 300px)' }}>
                <Spinner animation="border" variant="primary" />
                <p className="mt-4">Loading tickets...</p>
              </div>
            ) : tickets.length === 0 ? (
              
              <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 'calc(100vh - 300px)' }}>
                <p>No tickets found.</p>
              </div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={ticket._id}>
                      <td>{index + 1}</td>
                      <td>{ticket.event_name}</td>
                      <td>{new Date(ticket.event_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                      <td>{ticket.payment_status}</td>
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

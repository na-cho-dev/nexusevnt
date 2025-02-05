import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import Footer from '../layout/Footer';
import { useAuth } from '../../context/AuthContext';

const UserEvents = () => {
  const { userRole, userId } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(`/api/user/${userId}/events`);
        setEvents(response.data.events);
      } catch (error) {
        console.log('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userId]);

  return (
    <div>
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 300px)' }}>
        {userRole === 'Organizer' && (
          <div className="bg-body-secondary pt-5 p-3" style={{ width: '280px' }}>
            <h5 className="text-center p-2">Account Settings</h5>
            <div className="list-group">
              <Link to={`/${userRole.toLowerCase()}/${userId}/profile`} className="list-group-item list-group-item-action">Account Info</Link>
              <Link to={`/${userRole.toLowerCase()}/${userId}/events`} className="list-group-item list-group-item-action active">My Events</Link>
              <Link to={`/${userRole.toLowerCase()}/${userId}/tickets`} className="list-group-item list-group-item-action">My Tickets</Link>
              <Link to={`/${userRole.toLowerCase()}/${userId}/change-email`} className="list-group-item list-group-item-action">Change Email</Link>
              <Link to={`/${userRole.toLowerCase()}/${userId}/change-password`} className="list-group-item list-group-item-action">Change Password</Link>
            </div>
          </div>
        )}

        <div className="mt-4" style={{ width: userRole === 'Organizer' ? 'calc(100% - 300px)' : '100%' }}>
          <div className="p-4">
            <h4>My Events</h4>
            <hr />
            {loading ? (
              <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
                <Spinner animation="border" variant="primary" />
                <p className="mt-4">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
                <p>No events found.</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap justify-content-start gap-4">
                {events.map((event) => {
                  const imageSrc = event.event_image?.data
                    ? `data:${event.event_image.mimeType};base64,${event.event_image.data}`
                    : '/placeholder.jpg'; // Default image

                  return (
                    <Card key={event._id} className="custom-event-card" style={{ width: '20rem', padding: '10px' }}>
                      <div className="event-img-container">
                        <Card.Img variant="top" src={imageSrc} className="event-img" style={{ height: '200px', objectFit: 'cover' }} />
                      </div>
                      <Card.Body>
                        <Card.Title className="fw-bold">{event.event_name}</Card.Title>
                        <Card.Text className="text-muted small">
                          📅 {new Date(event.event_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </Card.Text>
                        <Card.Text className="text-muted small">
                          📍 {event.event_location}
                        </Card.Text>
                        <div className="d-flex justify-content-between mt-3">
                          <Button as={Link} to={`/events/${event._id}`} variant="primary" size="sm">
                            View Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserEvents;

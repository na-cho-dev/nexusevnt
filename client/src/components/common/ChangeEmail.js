import React, { useState } from 'react';
import Footer from '../layout/Footer';
import { Form, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const Email = () => {
  const { userData, setUserData, userRole, userId } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newEmail || !confirmEmail) {
      setError('Please fill in all fields.');
      return;
    }
    if (newEmail !== confirmEmail) {
      setError('Emails do not match.');
      return;
    }

    setLoading(true);
    try {
      const apiEndPoint =
        userRole === 'Organizer'
          ? `/api/organizer/${userData._id}`
          : `/api/attendee/${userData._id}`;
      const response = await axiosInstance.put(apiEndPoint, {
        email: newEmail,
      });
      console.log('Updated User:', response.data[userRole.toLowerCase()]);

      setUserData({ ...userData, email: newEmail }); // Update user context
      setSuccess('Email updated successfully.');
    } catch (err) {
      console.error(
        'Error updating email:',
        err.response.data.error || err.message.data.message
      );
      setError('Failed to update email. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="main-profile-container">
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 300px)' }}>
        {/* <NavMenu /> */}

        <div className="bg-body-secondary pt-5 p-3" style={{ width: '280px' }}>
          <h5 className="text-center p-2">Account Settings</h5>
          <div className="list-group">
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/profile`}
              className="list-group-item list-group-item-action"
            >
              Account Info
            </Link>
            <Link to={`/${userRole.toLowerCase()}/${userId}/events`} className="list-group-item list-group-item-action">My Events</Link>
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/tickets`}
              className="list-group-item list-group-item-action"
            >
              My Tickets
            </Link>
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/change-email`}
              className="list-group-item list-group-item-action active"
            >
              Change Email
            </Link>
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/change-password`}
              className="list-group-item list-group-item-action"
            >
              Change Password
            </Link>
            
          </div>
        </div>

        <div className="col-md-9 p-4" style={{ height: '650px' }}>
          <div className="mt-4">
            <h4>Change Email</h4>
            <hr />
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form>
              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="currentEmail">Current Email:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={userData.email}
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="newEmail">New Email:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="email"
                    placeholder="Enter new email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="confirmEmail">Confirm Email:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="email"
                    placeholder="Enter again"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="align-items-center ms-4">
                <Col md={3}>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    variant="primary"
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
                      'Save New Email'
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Email;

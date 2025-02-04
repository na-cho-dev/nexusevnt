import React, { useState } from 'react';
// import NavMenu from "../layout/NavBarElements";
import Footer from '../layout/Footer';
import { Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../services/axiosInstance';

const Password = () => {
  const { userData, setUserData, userRole, userId } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put('/auth/change-password', {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      setSuccess('Password updated successfully.');
    } catch (err) {
      console.error(err.response.data?.message, ':', err.response.data?.error);
      setError('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-profile-container">
      <div className="d-flex">
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
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/change-email`}
              className="list-group-item list-group-item-action"
            >
              Change Email
            </Link>
            <Link
              to={`/${userRole.toLowerCase()}/${userId}/change-password`}
              className="list-group-item list-group-item-action active"
            >
              Password
            </Link>
          </div>
        </div>

        <div className="col-md-9 p-4" style={{ height: '650px' }}>
          <div className="mt-4">
            <h4>Change Password</h4>
            <hr />
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form>
              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="firstName">Current Password:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="password"
                    id="firstName"
                    placeholder="Enter password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="lastName">New Password:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="password"
                    id="lastName"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="website">Confirm Password:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="password"
                    id="website"
                    placeholder="Enter again"
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      'Save New Password'
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

export default Password;

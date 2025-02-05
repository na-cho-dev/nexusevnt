import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import axiosInstance from '../services/axiosInstance';
import ImageUpload from '../components/common/ImageButton';
import Footer from '../components/layout/Footer';
import '../styles/ProfilePage.css';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { userData, setUserData, userRole, userId } = useAuth();
  const [user, setUser] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone_number: userData.phone_number,
    role: userData.role,
  });
  const [editingField, setEditingField] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState({});

  // if (!userData) {
  //   return (
  //     <div className="loading-screen">
  //       <Spinner animation="border" variant="primary" />
  //       Loading profile...
  //     </div>
  //   );
  // }

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/user/me");
  //       setUser(response.data);
  //       setUpdatedUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [editingField]: e.target.value });
  };

  const handleSave = async () => {
    setLoadingFields((prev) => ({ ...prev, [editingField]: true }));
    try {
      const apiEndPoint =
        userRole === 'Organizer'
          ? `/api/organizer/${userData._id}`
          : `/api/attendee/${userData._id}`;
      const response = await axiosInstance.put(apiEndPoint, updatedUser);
      console.log('Updated User:', response.data);
      setUser(updatedUser);
      // setUserData(updatedUser);
      setEditingField(null);
    } catch (error) {
      console.error('Error updating user:', error);
      console.error(
        'Error updating user (Server):',
        error.response.data.error,
        error.response.data.message
      );
    } finally {
      setLoadingFields((prev) => ({ ...prev, [editingField]: false }));
    }
  };

  const handleCancel = () => {
    setUpdatedUser(user);
    setEditingField(null);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex">
          {/* Left Sidebar */}
          <div
            className="bg-body-secondary pt-5 p-3"
            style={{ width: '280px' }}
          >
            <h5 className="text-center p-2">Account Settings</h5>
            <div className="list-group">
              <Link
                to={`/${userRole.toLowerCase()}/${userId}/profile`}
                className="list-group-item list-group-item-action active"
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
                className="list-group-item list-group-item-action"
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

          {/* Main Profile Content */}
          <div className="mt-4" style={{ width: 'calc(100% - 280px)' }}>
            <div className="p-4" style={{ width: '100%' }}>
              <h4>Account Information</h4>
              <hr />

              {/* Profile Photo Section */}
              <div className="">
                <h5 className="mt-3 mb-3">Profile Photo</h5>
                <ImageUpload />
              </div>

              {/* User Details */}
              <Form>
                <h5 className="mb-3 mt-5">Profile Information</h5>

                {[
                  { label: 'First Name', field: 'first_name' },
                  { label: 'Last Name', field: 'last_name' },
                  { label: 'Phone Number', field: 'phone_number' },
                  { label: 'Email', field: 'email', editable: false }, // Non-editable
                  { label: 'Role', field: 'role', editable: false }, // Non-editable
                ].map(({ label, field, editable = true }) => (
                  <Row className="mb-3 align-items-center" key={field}>
                    <Col md={3}>
                      <strong>{label}:</strong>
                    </Col>
                    <Col md={7}>
                      {editable && editingField === field ? (
                        <Form.Control
                          type="text"
                          value={updatedUser[field]}
                          onChange={handleChange}
                        />
                      ) : (
                        <p>{user[field] || 'Click edit'}</p>
                      )}
                    </Col>
                    <Col md={2}>
                      {loadingFields[field] ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : editable && editingField === field ? (
                        <>
                          <FaCheck
                            className="text-success"
                            onClick={handleSave}
                            style={{ cursor: 'pointer' }}
                          />
                          <FaTimes
                            className="text-danger ms-2"
                            onClick={handleCancel}
                            style={{ cursor: 'pointer' }}
                          />
                        </>
                      ) : editable ? (
                        <FaEdit
                          className="text-primary"
                          onClick={() => handleEdit(field)}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        ''
                      )}
                    </Col>
                  </Row>
                ))}
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;

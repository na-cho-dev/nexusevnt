import React from "react";
import NavMenu from "../components/layout/NavBarElements";
import Footer from "../components/layout/Footer";
import ImageUpload from "../components/common/ImageButton";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../styles/ProfilePage.css";

const Profile = () => {
  return (
    <div className="main-profile-container">
      <div className="row">
        <NavMenu />

        <div className="col-md-3 bg-body-secondary">
          <div className="list-group mt-5">
            <h5 className="text-center p-2">Account Settings</h5>
            <a
              href="#account-info"
              className="list-group-item list-group-item-action active"
            >
              Account Info
            </a>
            <a
              href="#change-email"
              className="list-group-item list-group-item-action"
            >
              Change Email
            </a>
            <a
              href="#password"
              className="list-group-item list-group-item-action"
            >
              Password
            </a>
          </div>
        </div>

        <div className="col-md-9">
          <div className="mt-5">
            <h4>Account Information</h4>
            <hr />

            <div className="ms-4-style">
              <h4>Profile Photo</h4>
              <ImageUpload />
            </div>

            <Form>
              <h5 className="ms-4-style mb-3 mt-3">Profile Information</h5>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="firstName">First Name:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="firstName"
                    placeholder="Enter first name"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="lastName"
                    placeholder="Enter last name"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="website">Website:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="url"
                    id="website"
                    placeholder="Enter website"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="company">Company:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="company"
                    placeholder="Enter company name"
                  />
                </Col>
              </Row>

              <h5 className="ms-4-style mb-3">Contact Details</h5>
              <p className="ms-4-style">
                These details are private and only used to contact you for
                ticketing or prizes.
              </p>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="phone">Phone Number:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="phone"
                    placeholder="Enter phone number"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="address">Address:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="address"
                    placeholder="Enter address"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="city">City/Town:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="city"
                    placeholder="Enter city"
                  />
                </Col>
              </Row>
              {/* Country */}
              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="country">Country:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="country"
                    placeholder="Enter country"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={3}>
                  <Form.Label htmlFor="pincode">Pincode:</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    id="pincode"
                    placeholder="Enter pincode"
                  />
                </Col>
              </Row>
              <Row className="align-items-center ms-4">
                <Col md={3}>
                  <Button type="submit" variant="primary">
                    Save Changes
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

export default Profile;

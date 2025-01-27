import React from "react";
import NavMenu from "../layout/NavBarElements";
import Footer from "../layout/Footer";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Password = () => {
  return (
    <div className="main-profile-container">
      <div className="row">
        <NavMenu />

        <div className="col-md-3 bg-body-secondary">
          <div className="list-group mt-5">
            <h5 className="text-center p-2">Account Settings</h5>
            <Link
              to="/AccountInfo"
              className="list-group-item list-group-item-action"
            >
              Account Info
            </Link>
            <Link
              to="/ChangeEmail"
              className="list-group-item list-group-item-action"
            >
              Change Email
            </Link>
            <Link
              to="ProfPassword"
              className="list-group-item list-group-item-action"
            >
              Password
            </Link>
          </div>
        </div>

        <div className="col-md-9" style={{ height: "650px" }}>
          <div className="mt-5">
            <h4>Change Password</h4>
            <hr />
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
                  />
                </Col>
              </Row>

              <Row className="align-items-center ms-4">
                <Col md={3}>
                  <Button type="submit" variant="primary">
                    Save New Password
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

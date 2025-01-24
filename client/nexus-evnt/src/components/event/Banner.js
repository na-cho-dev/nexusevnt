import React from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Progress from "../event/Progress";
import NavMenu from "../layout/NavBarElements";
import Footer from "../layout/Footer";

const Banner = () => (
  <>
    <NavMenu />
    <div className="container-md " style={{ height: "650px" }}>
      <h4 className="mt-5 ms-3">Upload Event Banner</h4>
      <Container className="mt-4">
        <Progress />
      </Container>
      <Form className="mt-4 ms-3">
        <Form.Group className="mb-4">
          <Col md={6}>
            <Form.Label className="fw-bold">Banner Image</Form.Label>
            <Form.Control type="file" />
            <p className="text-muted mt-2">
              Feature Image must be at least <strong>1170 pixels wide</strong>{" "}
              by <strong>504 pixels high</strong>.
            </p>
            <p className="text-muted">Valid file formats: JPG, GIF, PNG.</p>
          </Col>
        </Form.Group>

        <div className="mt-5 me-5-style mb-5 text-end">
          <Button
            variant="secondary"
            className="me-3"
            as={Link}
            to="/CreateEventPage"
          >
            Go back to Edit Event
          </Button>
          <Button as={Link} to="/Ticketing" variant="primary">
            Save & Continue
          </Button>
        </div>
      </Form>
    </div>
    <Footer />
  </>
);

export default Banner;

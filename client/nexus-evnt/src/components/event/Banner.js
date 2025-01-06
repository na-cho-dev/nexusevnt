import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Banner = () => (
  <div>
    <h4 className="mb-4">Upload Event Banner</h4>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Banner Image</Form.Label>
        <Form.Control type="file" />
        <p className="mt-3">
          Feature Image must be at least 1170 pixels wide by 504 pixels high.
        </p>
        <p className="mt-3">Valid file formats: JPG, GIF, PNG.</p>
      </Form.Group>
      <Button as={Link} to="/Edit" variant="primary">
        Go back to Edit Event
      </Button>
      <Button as={Link} to="/Ticketing" variant="primary">
        Save & Continue
      </Button>
    </Form>
  </div>
);

export default Banner;

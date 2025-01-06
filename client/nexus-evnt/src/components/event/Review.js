import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Review = () => (
  <div>
    <h4 className="mb-4">Review Your Event</h4>
    <p>Nearly there! Check everything's correct.</p>
    <Button as={Link} to="/HomePage" variant="success">
      Save for Later
    </Button>
    <Button variant="success">Publish Event</Button>
  </div>
);

export default Review;

import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DateAndTimePicker from "../common/TimeDate";
import LocationSection from "../common/Location";

const Edit = () => (
  <div>
    <h4 className="mb-4">Create a New Event</h4>
    <Form>
      <section className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the name of your event"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Category</Form.Label>
          <Form.Select>
            <option>Please select one</option>
            <option>Music</option>
            <option>Sports</option>
            <option>Education</option>
          </Form.Select>
        </Form.Group>
        <h5>Date & Time</h5>
        <Form.Group className="mb-3">
          <Form.Label>Event Type</Form.Label>
          <div className="mb-3">
            <Form.Check
              inline
              label="Single Event"
              name="group1"
              type="checkbox"
              id="inline-checkbox-1"
            />
            <Form.Check
              inline
              label="Recurring Event"
              name="group1"
              type="checkbox"
              id="inline-checkbox-2"
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <DateAndTimePicker />
        </Form.Group>
        <Form.Group className="mb-3">
          <LocationSection />
        </Form.Group>
        <h5>Additional information</h5>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Event Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </section>
      <Button as={Link} to="/Banner" variant="primary">
        Save & Continue
      </Button>
    </Form>
  </div>
);

export default Edit;

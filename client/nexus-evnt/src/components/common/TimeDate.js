import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Form } from "react-bootstrap";

const DateAndTimePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <div>
      <h5>Session(s)</h5>

      {/* Start Date Picker */}
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <DayPicker mode="single" selected={startDate} onSelect={setStartDate} />
        {startDate && (
          <p>Selected Start Date: {startDate.toLocaleDateString()}</p>
        )}
      </Form.Group>

      {/* Start Time Input */}
      <Form.Group className="mt-3">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </Form.Group>

      {/* End Time Input */}
      <Form.Group className="mt-3">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </Form.Group>

      {/* Summary */}
      <div className="mt-4">
        <h6>Summary:</h6>
        {startDate && <p>Start Date: {startDate.toLocaleDateString()}</p>}
        {startTime && <p>Start Time: {startTime}</p>}
        {endTime && <p>End Time: {endTime}</p>}
      </div>
    </div>
  );
};

export default DateAndTimePicker;

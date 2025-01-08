import React from "react";
import { Card } from "react-bootstrap";

const EventCard = ({ image, title, text }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        className="img-fluid"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventCard;

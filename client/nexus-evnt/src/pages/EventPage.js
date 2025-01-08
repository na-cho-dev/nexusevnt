import React from "react";
import EventCard from "../components/event/EventCard";
import NavMenu from "../components/layout/NavBarElements";
import Header from "../components/layout/Header";
import Img from "../images/wedding.jpg";
import { Row, Col } from "react-bootstrap";
import "../styles/EventPage.css";

const Event = () => {
  const cardsData = [
    {
      image: Img,
      title: "Card 1",
      text: "This is the first card.",
    },
    {
      image: Img,
      title: "Card 2",
      text: "This is the second card.",
    },
    {
      image: Img,
      title: "Card 3",
      text: "This is the third card.",
    },
    {
      image: Img,
      title: "Card 4",
      text: "This is the third card.",
    },
    {
      image: Img,
      title: "Card 5",
      text: "This is the third card.",
    },
    {
      image: Img,
      title: "Card 6",
      text: "This is the third card.",
    },
    {
      image: Img,
      title: "Card 7",
      text: "This is the third card.",
    },
    {
      image: Img,
      title: "Card 8",
      text: "This is the third card.",
    },
    {
      image: Img,
      title: "Card 9",
      text: "This is the third card.",
    },
  ];

  return (
    <div>
      <NavMenu />
      <Header />
      <div className="card-container container mt-4">
        <Row xs={1} md={3} className="g-3">
          {cardsData.map((event, index) => (
            <Col key={index}>
              <EventCard
                image={event.image}
                title={event.title}
                text={event.text}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Event;

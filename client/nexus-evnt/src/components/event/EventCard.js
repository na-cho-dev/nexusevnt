import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../styles/EventCard.css";

function EventCard() {
  const cardData = [
    {
      id: 1,
      title: "Card 1",
      text: "This is the first card with unique content.",
      image: "https://via.placeholder.com/150x100?text=Card+1",
    },
    {
      id: 2,
      title: "Card 2",
      text: "This is the second card with another unique text.",
      image: "https://via.placeholder.com/150x100?text=Card+2",
    },
    {
      id: 3,
      title: "Card 3",
      text: "Third card here! Add more custom content as needed.",
      image: "https://via.placeholder.com/150x100?text=Card+3",
    },
    {
      id: 4,
      title: "Card 4",
      text: "Finally, the fourth card wraps up our grid example.",
      image: "https://via.placeholder.com/150x100?text=Card+4",
    },
    {
      id: 5,
      title: "Card 5",
      text: "This is the fifth card.",
      image: "https://via.placeholder.com/150x100?text=Card+5",
    },
    {
      id: 6,
      title: "Card 6",
      text: "This is the sixth card.",
      image: "https://via.placeholder.com/150x100?text=Card+6",
    },
  ];

  return (
    <Row xs={1} md={3}  sm={2} className="card-container">
      {cardData.map((card) => (
        <Col key={card.id} className="custom-col">
          <Card className="custom-card">
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default EventCard;

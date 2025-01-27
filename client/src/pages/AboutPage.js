import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import NavMenu from "../components/layout/NavBarElements";
import EventSlider from "../components/common/EventSlider";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import Fem1 from "../images/fem-1.jpg";
import Fem2 from "../images/fem-2.jpg";
import Male1 from "../images/male-1.jpg";
import Male2 from "../images/male-2.jpg";

const About = () => {
  return (
    <div>
      {/* <NavMenu /> */}
      <EventSlider />
      <Container className="py-5 container-md">
        <Row className="text-center mb-4">
          <Col>
            <h1>About Us</h1>
            <p className="text-muted">
              Dedicated to excellence and innovation, we aim to bring the best
              solutions to our clients.
            </p>
            <p className="text-muted">
              {" "}
              Pellentesque egestas eros quis nibh mattis, vel congue nisl
              auctor. Phasellus ultricies lacinia eros non pellentesque. Cras
              congue semper enim, sit amet tincidunt purus sollicitudin eu.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Integer feugiat, risus eu sollicitudin hendrerit, purus lectus
              consequat orci, nec vestibulum ex felis et tortor. Suspendisse nec
              dui posuere lorem sagittis fringilla eget non diam. Maecenas
              tincidunt placerat pulvinar. Nunc ultricies, enim vel finibus
              malesuada, lorem neque euismod lacus, id faucibus risus mi
              convallis ligula. Ut semper a justo a bibendum. Nam semper augue
              sed nulla gravida pellentesque. Cras posuere enim ex, sed
              vestibulum lacus feugiat eget. Mauris at aliquam lacus. Praesent
              vehicula risus odio, vel feugiat felis dignissim eget. Mauris eget
              erat sit amet elit consequat lacinia. Etiam tempor odio arcu, nec
              sagittis nibh volutpat vitae. Phasellus sagittis, neque semper
              tincidunt ultrices, urna sem egestas erat, ut porta turpis mauris
              non tortor.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6}>
            <h2>Our Mission</h2>
            <p className="text-muted">
              Our mission is to empower businesses through cutting-edge
              technology and personalized solutions that help them grow and
              succeed.
            </p>
          </Col>
          <Col md={6}>
            <h2>Our Values</h2>
            <ul className="text-muted">
              <li>
                Customer Focus: We put our clients at the heart of everything we
                do.
              </li>
              <li>
                Innovation: We embrace change and seek to improve continuously.
              </li>
              <li>
                Integrity: Honesty and transparency are core to our business.
              </li>
              <li>Teamwork: Collaboration drives our success.</li>
            </ul>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <Col>
            <h2>Meet Our Team</h2>
            <p className="text-muted">
              A passionate group of professionals dedicated to bringing your
              vision to life.
            </p>
          </Col>
        </Row>
        <Row className="g-1 d-flex justify-content-between">
          <Col md={3} className="d-flex">
            <Card>
              <Card.Img variant="top" src={Male1} alt="Team Member" />
              <Card.Body>
                <Card.Title>Keith Juma</Card.Title>
                <Card.Text>Backend Engineer</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="d-flex">
            <Card>
              <Card.Img variant="top" src={Fem1} alt="Team Member" />
              <Card.Body>
                <Card.Title>Angie Monnye</Card.Title>
                <Card.Text>Frontend Engineer</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="d-flex">
            <Card>
              <Card.Img variant="top" src={Male2} alt="Team Member" />
              <Card.Body>
                <Card.Title>Fortune Iheanacho</Card.Title>
                <Card.Text>Backend Engineer</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="d-flex">
            <Card>
              <Card.Img variant="top" src={Fem2} alt="Team Member" />
              <Card.Body>
                <Card.Title>Grace Bamidele</Card.Title>
                <Card.Text>Frontend Engineer</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <h2>Join Us</h2>
            <p className="text-muted">
              Ready to start your journey with us? Let's make great things
              happen together.
            </p>
            <Button variant="success" size="lg" as={Link} to="/ContactPage">
              Contact Us
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default About;

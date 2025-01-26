import React from "react";
import "../styles/HomePage.css";
import NavMenu from "../components/layout/NavBarElements";
import Img from "../images/wedding.jpg";
import EventList from "../components/event/EventList";
import Footer from "../components/layout/Footer";
import EventSlider from "../components/common/EventSlider";
import Header from "../components/layout/Header";
import EventCard from "../components/event/EventCard";
import Button from "react-bootstrap/Button";

const Home = () => {
  const events = [
    {
      image: Img,
      title: "Delhi 6 - Traditional Food",
      date: "2023-11-23",
      location: "Chengalpattu, India",
      price: 1200,
      category: "Art and Craft Fair",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 0,
      category: "Outdoor Movie Nights",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 290,
      category: "Art and Craft Fair",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 8902,
      category: "Outdoor Movie Nights",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 0,
      category: "Carnival and Fairs",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 123,
      category: "Music Festival",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 123,
      category: "Music Festival",
    },
    {
      image: Img,
      title: "Startup Talks",
      date: "2023-12-17",
      location: "New Delhi, India",
      price: 123,
      category: "Music Festival",
    },
  ];

  return (
    <div className="home-page">
      <NavMenu />
      <Header />
      <EventList />
      <section className="events-section">
        <h5 className="mt-6">Popular events right now</h5>
        <div className="row">
          {events.slice(0, 9).map((event) => (
            <div key={event.id} className="col-md-3">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <div className="button-container">
          <Button href="/EventPage" className="event-button">
            View More
          </Button>
        </div>
        <section className="cta-banner bg-dark">
          <div className="container-lg text-center text-light ">
            <h3>Events specially curated for you!</h3>
            <p className="mt-3">
              Get event suggestions tailored to your interests! Don't let your
              favorite events slip away.
            </p>
            <div className="button-container">
              <Button href="/BookingPage" className="cta-button">
                Book Now
              </Button>
            </div>
          </div>
        </section>
      </section>
      <section className="slider-section">
        <EventSlider />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;

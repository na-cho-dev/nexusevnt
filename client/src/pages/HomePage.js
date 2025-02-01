import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
// import NavMenu from "../components/layout/NavBarElements";
import EventList from "../components/event/EventList";
import Footer from "../components/layout/Footer";
import EventSlider from "../components/common/EventSlider";
import Header from "../components/layout/Header";
import EventCard from "../components/event/EventCard";
import Button from "react-bootstrap/Button";
import axiosInstance from "../services/axiosInstance";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const [events, setEvents] = useState([]); // Manage events as state
  const [loading, setLoading] = useState(true); // Loading state

  const getEvents = async () => {
    try {
      const response = await axiosInstance.get("/api/events", {
        withCredentials: true,
      });
      setEvents(response.data.events); // Update events state
    } catch (error) {
      console.error(
        "Could not fetch events: ",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
    }
  };

  useEffect(() => {
    getEvents(); // Fetch events when the component mounts
  }, []);

  return (
    <div className="home-page">
      <Header />
      <EventList />
      <section className="events-section">
        <h5 className="card-head">Popular events right now</h5>
        <div className="card-style">
        {loading ? ( // Show a loader while fetching events
          <div className="d-flex justify-content-center align-items-center vh-30">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : events.length > 0 ? (
          events.slice(0, 8).map((event) => (
            <div key={event._id || event.event_name}> {/* Use _id or a fallback property */}
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p>No events available</p> // Handle empty events array
        )}
        </div>

        <div className="button-container">
          <Link to="/Event">
            <Button className="event-button">
              View More
            </Button>
          </Link>
        </div>
        <section className="cta-banner bg-dark">
          <div className="container-lg text-center text-light">
            <h3>Events specially curated for you!</h3>
            <p className="mt-3">
              Get event suggestions tailored to your interests! Don't let your
              favorite events slip away.
            </p>
            <div className="button-container">
              <Button href="/" className="cta-button">
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

import React from "react";
import "../styles/HomePage.css";
import NavMenu from "../components/layout/NavBarElements";
// import Festival from ".././images/festival.jpg";
import EventList from "../components/event/EventList";
import Footer from "../components/layout/Footer";
import EventSlider from "../components/common/EventSlider";
import Header from "../components/layout/Header";
import EventCard from "../components/event/EventCard";
import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <div className="home-page">
      <NavMenu />
      <Header />
      <EventList />
      <section className="events-section">
        <h5>Popular events right now</h5>
        <EventCard />
        <div className="button-container">
           <Button href="/" className="event-button">
              View More
            </Button>
        </div>
        <section className="cta-banner bg-dark" >
          <div className="container-lg text-center text-light "> 
            <h3>Events specially curated for you!</h3>
            <p className="mt-3">Get event suggestions tailored to your interests! Don't let your favorite events slip away.</p>
            <div className="button-container">
              <Button href="/" className="cta-button">
                  Get Started
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

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Dropdown } from "react-bootstrap";
// import Img from "../images/wedding.jpg";
// import NavMenu from "../components/layout/NavBarElements";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import EventCard from "../components/event/EventCard";
import EventFilters from "../components/event/EventFilters";
import "../styles/EventPage.css";
import axiosInstance from "../services/axiosInstance";

const Event = () => {
  const [sortOption, setSortOption] = useState("Relevance");
  const [filters, setFilters] = useState({
    price: { free: false, paid: false },
    date: { today: false, tomorrow: false, thisWeek: false },
    category: {},
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredEvents = events.filter((event) => {
    // Price Filter
    if (filters.price.free && event.price !== 0) return false;
    if (filters.price.paid && event.price === 0) return false;

    // Category Filter
    const selectedCategories = Object.keys(filters.category).filter(
      (key) => filters.category[key]
    );
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(event.category)
    )
      return false;

    if (filters.date.today) {
      const today = new Date();
      const eventDate = new Date(event.date);
      if (
        eventDate.getDate() !== today.getDate() ||
        eventDate.getMonth() !== today.getMonth() ||
        eventDate.getFullYear() !== today.getFullYear()
      ) {
        return false;
      }
    }

    return true;
  });

  const handleSort = (option) => {
    setSortOption(option);
    const sortedEvents = [...filteredEvents];
    if (option === "Price: Low to High") {
      sortedEvents.sort((a, b) => a.price - b.price);
    } else if (option === "Price: High to Low") {
      sortedEvents.sort((a, b) => b.price - a.price);
    } else if (option === "Date: Soonest") {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setEvents(sortedEvents);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: { ...prevFilters[category], ...value },
    }));
  };

  return (
    <div className="main-container">
      {/* <NavMenu /> */}
      <Header />
      <Container fluid>
        <Row className="mt-4">
          {/* Filters Section */}
          <Col md={3} className="bg-light p-3">
            <EventFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Col>

          {/* Events Section */}
          <Col md={9}>
            <Row className="mb-3">
              <Col className="text-end">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    className="btn-color"
                  >
                    Sort by: {sortOption}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSort("Relevance")}>
                      Relevance
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSort("Price: Low to High")}
                    >
                      Price: Low to High
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSort("Price: High to Low")}
                    >
                      Price: High to Low
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("Date: Soonest")}>
                      Date: Soonest
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Event Cards */}
            {loading ? ( 
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : filteredEvents.length > 0 ? ( // ✅ Correct ternary structure
            <Row>
              {filteredEvents.map((event, index) => (
                <Col md={6} lg={4} key={index}>
                  <EventCard event={event} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="d-flex justify-content-center align-items-center h-100">Error fetching Events</p>
          )}

          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Event;

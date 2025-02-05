import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Festival from "../../images/festival.jpg";
import Light from "../../images/light.jpg";
import Musician from "../../images/musician.jpg";
import Nightclub from "../../images/nightclub.jpg";
import Wedding from "../../images/wedding.jpg";
import "../../styles/EventList.css";

const EventList = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleClick = (event) => {
    event.target.classList.add("dissolve");
    setTimeout(() => {
      navigate("/events-category-entertainment");
    }, 200);
  };

  // Scroll left/right
  // const scrollLeft = () => {
  //   carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  // };

  // const scrollRight = () => {
  //   carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  // };

  return (
    <section className="category-section">
      <h5>Explore Category</h5>
      
      {/* Scroll buttons for desktop */}
      {/* <button className="scroll-btn left" onClick={scrollLeft}>&#10094;</button>
      <button className="scroll-btn right" onClick={scrollRight}>&#10095;</button> */}

      {/* Category Carousel */}
      <div className="category-container" ref={carouselRef}>
        <ul>
          <li onClick={handleClick}>
            <img alt="event" src={Festival} />
            <div>Color Runs</div>
          </li>
          <li onClick={handleClick}>
            <img alt="event" src={Light} />
            <div>Food and Drink Festivals</div>
          </li>
          <li onClick={handleClick}>
            <img alt="event" src={Musician} />
            <div>Music Festivals</div>
          </li>
          <li onClick={handleClick}>
            <img alt="event" src={Nightclub} />
            <div>Carnivals and Fairs</div>
          </li>
          <li onClick={handleClick}>
            <img alt="event" src={Wedding} />
            <div>Outdoor Movie Nights</div>
          </li>
          <li onClick={handleClick}>
            <img alt="event" src={Wedding} />
            <div>Art and Craft Fairs</div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default EventList;

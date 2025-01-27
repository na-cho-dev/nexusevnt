import React from "react";
import { useNavigate } from "react-router-dom";
import Festival from "../../images/festival.jpg";
import Light from "../../images/light.jpg";
import Musician from "../../images/musician.jpg";
import Nightclub from "../../images/nightclub.jpg";
import Wedding from "../../images/wedding.jpg";
import "../../styles/EventList.css";

const EventList = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.target.classList.add("dissolve");

    setTimeout(() => {
      navigate.push("/events-category-entertainment");
    }, 200); // 200ms matches the animation duration
  };

  return (
    <section className="category-section">
      <h5>Explore Category</h5>
      <div className="category-container">
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

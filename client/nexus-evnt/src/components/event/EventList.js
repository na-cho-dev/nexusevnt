import React from "react";
import Festival from "../../images/festival.jpg";
import Light from "../../images/light.jpg";
import Musician from "../../images/musician.jpg";
import Nightclub from "../../images/nightclub.jpg";
import Wedding from "../../images/wedding.jpg";
import "../../styles/EventList.css";

const EventList = () => {
  return (
    <section className="category-section">
      <h5>Explore Category</h5>
      <div className="category-container">
        <ul>
          <li>
            <img alt="event" src={Festival} />
            <div>Color Runs</div>
          </li>
          <li>
            <img alt="event" src={Light} />
            <div>Food and Drink Festivals</div>
          </li>
          <li>
            <img alt="event" src={Musician} />
            <div>Music Festivals</div>
          </li>
          <li>
            <img alt="event" src={Nightclub} />
            <div>Carnivals and Fairs</div>
          </li>
          <li>
            <img alt="event" src={Wedding} />
            <div>Outdoor Movie Nights</div>
          </li>
          <li>
            <img alt="event" src={Wedding} />
            <div>Art and Craft Fairs</div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default EventList;

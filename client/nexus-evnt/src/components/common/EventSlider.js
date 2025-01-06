import Carousel from 'react-bootstrap/Carousel';
import '../../styles/EventSlider.css';
import SlideOne from "../../images/concert-festival.jpg";
import SlideTwo from "../../images/lantern.jpg";
import SlideThree from "../../images/lantern-festival.jpg";

function EventSlider() {
  return (
    <Carousel data-bs-theme="dark" className="slider-container">
      <Carousel.Item>
        <img
          className="slider d-block"
          src={SlideOne}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="slider d-block"
          src={SlideTwo}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="slider d-block "
          src={SlideThree}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default EventSlider;
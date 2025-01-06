import React from "react";
import "../../styles/Header.css";
import Banner from "../../images/concert.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Header = () => {
  return (
    <section className="hero-section">
      <figure className="banner">
        <img className="banner-image" alt="banner" src={Banner} />
      </figure>
      <div className="hero-content">
        <h1>
          Don't miss out! <br />
          Explore the
          <span style={{ color: "var(--purple)" }}> vibrant events</span>{" "}
          happening locally and globally.
        </h1>
        <InputGroup className="mb-3">
          <Form.Control aria-label="Text input with dropdown button" />
          <DropdownButton
            variant="outline-secondary"
            title="Location"
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Separated link</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </div>
    </section>
  );
};

export default Header;

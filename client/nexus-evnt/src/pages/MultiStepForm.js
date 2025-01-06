import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Progress from "../components/event/Progress";
import Edit from "../components/event/Edit";
import Banner from "../components/event/Banner";
import Ticketing from "../components/event/Ticketing";
import Review from "../components/event/Review";

const MultiStepForm = () => (
  <Container className="mt-5">
    <Progress />
    <div className="mt-4">
      <Routes>
        <Route path="/Edit" element={<Edit />} />
        <Route path="/Banner" element={<Banner />} />
        <Route path="/Ticketing" element={<Ticketing />} />
        <Route path="/Review" element={<Review />} />
      </Routes>
    </div>
  </Container>
);

export default MultiStepForm;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Edit from "../components/event/Edit";
import Banner from "../components/event/Banner";
import Ticketing from "../components/event/Ticketing";
import Review from "../components/event/Review";

const MultiStepForm = () => (
  <div>
    <Routes>
      <Route path="/Edit" element={<Edit />} />
      <Route path="/Banner" element={<Banner />} />
      <Route path="/Ticketing" element={<Ticketing />} />
      <Route path="/Review" element={<Review />} />
    </Routes>
  </div>
);

export default MultiStepForm;

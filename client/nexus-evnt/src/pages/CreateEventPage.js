import React from "react";
import NavBarElements from "../components/layout/NavBarElements";
import MultiStepForm from "./MultiStepForm";
import Edit from "../components/event/Edit";
import Footer from "../components/layout/Footer";

const CreateEvent = () => {
  return (
    <div className="create-event-container">
      <NavBarElements />
      <MultiStepForm />
      <Edit />
      <Footer />
    </div>
  );
};

export default CreateEvent;

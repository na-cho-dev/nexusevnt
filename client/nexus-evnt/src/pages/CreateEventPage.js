import React from "react";
import NavBarElements from "../components/layout/NavBarElements";
import MultiStepForm from "./MultiStepForm";
import Edit from "../components/event/Edit";

const CreateEvent = () => {
  return (
    <div className="create-event-container">
      <NavBarElements />
      <MultiStepForm />
      <Edit />
    </div>
  );
};

export default CreateEvent;

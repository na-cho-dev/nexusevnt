import React, { useState } from "react";
import Edit from "../components/event/Edit";
import Banner from "../components/event/Banner";
import Ticketing from "../components/event/Ticketing";
import Review from "../components/event/Review";
import Progress from "../components/event/Progress";

const CreateEventPage = () => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    time: "",
    location: "",
    host: "",
    description: "",
    banner: null,
    ticketType: "",
    ticketPrice: "",
    ticketQuantity: "",
  });

  const goToNextStep = () => setStep(step + 1);
  const goToPreviousStep = () => setStep(step - 1);
  const updateEventData = (updatedData) => {
    setEventData((prevData) => ({ ...prevData, ...updatedData }));
  };
  const handleSubmit = () => {
    console.log("Event Published:", eventData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Edit
            eventData={eventData}
            onUpdate={updateEventData}
            onNext={goToNextStep}
          />
        );
      case 2:
        return (
          <Banner
            eventData={eventData}
            onUpdate={updateEventData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 3:
        return (
          <Ticketing
            eventData={eventData}
            onUpdate={updateEventData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 4:
        return (
          <Review
            eventData={eventData}
            onEdit={goToPreviousStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return (
          <Edit
            eventData={eventData}
            onUpdate={updateEventData}
            onNext={goToNextStep}
          />
        );
    }
  };

  return (
    <div>
      {/* <Progress currentStep={step} /> */}
      {renderStep()}
    </div>
  );
};

export default CreateEventPage;

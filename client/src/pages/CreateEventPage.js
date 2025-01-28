import React, { useState } from "react";
import Edit from "../components/event/Edit";
import Banner from "../components/event/Banner";
import Ticketing from "../components/event/Ticketing";
import Review from "../components/event/Review";
import Progress from "../components/event/Progress";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    banner: null,
    ticket_tiers: [
      {
        tier_type: "Regular",
        tier_price: "",
        total_tickets: "",
      },
    ],
  });

  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (step === 2 && eventData.eventType === "Free") {
        // Automatically populate ticket tiers for free events
        if (eventData.ticket_tiers.length === 0) {
          setEventData((prevData) => ({
            ...prevData,
            ticket_tiers: [{
              tier_type: "Regular",
              tier_price: "Free",
              total_tickets: 100, // Default number of tickets for Free events
            }],
          }));
        }
        setStep(step + 2); // Skip ticketing step and go directly to review
      } else {
        setStep(step + 1);
      }
    }
  };

  const validateCurrentStep = () => {
    if (step === 1 && !eventData.title) {
      alert("Please fill in the event title");
      return false;
    }
    return true;
  };

  const goToPreviousStep = () => {
    if (step === 4 && eventData.eventType === "Free") {
      setStep(step - 2); // Skip back to Banner (2) from Review (4)
    } else {
      setStep(step - 1);
    }
  };

  const updateEventData = (updatedData) => {
    // Ensure total_tickets is handled inside ticket_tiers
    const { total_tickets, ...rest } = updatedData;
    setEventData((prevData) => ({ ...prevData, ...rest }));
  };

  const handleSubmit = async () => {
    // Validation for ticket tiers
    if (eventData.eventType === "Free" && eventData.ticket_tiers.length === 0) {
      setEventData((prevData) => ({
        ...prevData,
        ticket_tiers: [{
          tier_type: "Regular",
          tier_price: "Free",
          total_tickets: 100, // Default number of tickets for Free events
        }],
      }));
    }

    // Validation for non-free events (ensure at least one ticket tier exists)
    if (eventData.eventType !== "Free" && eventData.ticket_tiers.length === 0) {
      alert("Please add at least one ticket tier.");
      return;
    }

    // Submit event data
    let response;
    try {
      const token = localStorage.getItem('accessToken');
      console.log("Token:", token);

      const formData = new FormData();
      formData.append("banner", eventData.banner); // Add the file
      formData.append("title", eventData.title);
      formData.append("category", eventData.category);
      formData.append("description", eventData.description);
      formData.append("eventType", eventData.eventType);
      formData.append("date", eventData.date);
      formData.append("location", eventData.location);
      formData.append("startTime", eventData.startTime);
      formData.append("endTime", eventData.endTime);
      formData.append("ticket_tiers", JSON.stringify(eventData.ticket_tiers));

      response = await axiosInstance.post(
        "/api/create-event",
        { eventData },
        { withCredentials: true,
          headers:
          {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        },
      );

      navigate("/Profile"); // Redirect to the Home page
    } catch (error) {
      console.error(
        "Error Creating Event:",
        error.response?.data?.message || error.message
      );
      // setErrorMessage(
      //   error.response?.data?.message || "An error occurred. Please try again."
      // );
    }

    console.log("Event Published:", eventData);
    console.log("Event Published:", response);
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

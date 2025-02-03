import React, { useState } from 'react';
import Edit from '../components/event/Edit';
import Banner from '../components/event/Banner';
import Ticketing from '../components/event/Ticketing';
import Review from '../components/event/Review';
import Progress from '../components/event/Progress';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: '',
    category: '',
    eventType: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    banner: null,
    ticket_tiers: [
      {
        tier_type: 'Regular',
        tier_price: '',
        total_tickets: '',
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (step === 2 && eventData.eventType === 'Free') {
        // Automatically populate ticket tiers for free events
        if (eventData.ticket_tiers.length === 0) {
          setEventData((prevData) => ({
            ...prevData,
            ticket_tiers: [
              {
                tier_type: 'Regular',
                tier_price: 0,
                total_tickets: 100, // Default number of tickets for Free events
              },
            ],
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
      alert('Please fill in the event title');
      return false;
    }
    return true;
  };

  const goToPreviousStep = () => {
    if (step === 4 && eventData.eventType === 'Free') {
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
    setLoading(true);
    if (eventData.eventType !== 'Free' && eventData.ticket_tiers.length === 0) {
      alert('Please add at least one ticket tier.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      // console.log(`Event Banner: ${eventData.banner}`)

      const startTime = `${eventData.date}T${eventData.startTime}:00Z`; // Combine date and time
      const endTime = `${eventData.date}T${eventData.endTime}:00Z`;
      const formData = new FormData();
      formData.append('event_image', eventData.banner); // Add the file
      formData.append('title', eventData.title);
      formData.append('category', eventData.category);
      formData.append('description', eventData.description);
      formData.append('eventType', eventData.eventType);
      formData.append('date', eventData.date);
      formData.append('location', eventData.location);
      formData.append('startTime', startTime);
      formData.append('endTime', endTime);
      formData.append('ticket_tiers', JSON.stringify(eventData.ticket_tiers));

      // console.log(`Form Data: ${formData}`)

      // Correct API request
      const response = await axiosInstance.post('/api/create-event', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Event Published:', response.data);
      navigate('/events'); // Redirect to the Profile page
    } catch (error) {
      console.error(
        'Error Creating Event:',
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
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
            loading={loading}
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

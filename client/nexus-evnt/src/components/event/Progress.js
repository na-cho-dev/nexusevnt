import React from "react";
import { useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const steps = [
  { name: "Edit", path: "/CreateEventPage" },
  { name: "Banner", path: "/Banner" },
  { name: "Ticketing", path: "/Ticketing" },
  { name: "Review", path: "/Review" },
];

const Progress = () => {
  const location = useLocation();

  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );

  const progressPercentage =
    currentStepIndex !== -1 ? ((currentStepIndex + 1) / steps.length) * 100 : 0;

  return (
    <>
      <ProgressBar now={progressPercentage} />
      <div className="d-flex justify-content-between mt-2 container-mb">
        {steps.map((step, index) => (
          <span
            key={index}
            className={
              currentStepIndex === index
                ? "text-primary fw-bold"
                : currentStepIndex > index
                ? "text-primary"
                : "text-muted"
            }
          >
            {step.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default Progress;

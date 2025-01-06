import React from "react";
import { useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const steps = ["Edit", "Banner", "Ticketing", "Review"];

const Progress = () => {
  const location = useLocation();
  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.toLowerCase())
  );

  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <>
      <ProgressBar now={progressPercentage} />
      <div className="d-flex justify-content-between mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={
              currentStepIndex >= index ? "text-primary" : "text-muted"
            }
          >
            {step}
          </span>
        ))}
      </div>
    </>
  );
};

export default Progress;

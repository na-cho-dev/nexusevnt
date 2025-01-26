import React from "react";
import { ProgressBar } from "react-bootstrap";

const steps = ["Edit", "Banner", "Ticketing", "Review"];

const Progress = ({ currentStep }) => {
  const progressPercentage =
    currentStep > 0 ? (currentStep / steps.length) * 100 : 0;

  return (
    <>
      <ProgressBar now={progressPercentage} />
      <div className="d-flex justify-content-between mt-2 container-mb">
        {steps.map((step, index) => (
          <span
            key={index}
            className={
              currentStep - 1 === index
                ? "text-primary fw-bold"
                : currentStep - 1 > index
                ? "text-primary"
                : "text-muted"
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

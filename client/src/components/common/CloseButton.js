import React from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";

function Close() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div data-bs-theme="dark" className="bg-dark p-2">
      <CloseButton
        className="btn-close"
        onClick={handleClick}
        aria-label="Hide"
      />
    </div>
  );
}

export default Close;

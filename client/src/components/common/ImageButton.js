import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import "../../styles/ImageButton.css";
import Camera from "../../images/camera.png";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div style={{ marginRight: "10px" }}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            roundedCircle
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
            alt="Uploaded Preview"
          />
        ) : (
          <div
            style={{
              width: "150px",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
              borderRadius: "50%",
              backgroundColor: "#f8f9fa",
            }}
          >
            <span
              style={{ fontSize: "14px", color: "#888", textAlign: "center" }}
            >
              No Image Selected
            </span>
          </div>
        )}
      </div>

      <div>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="uploadButton"
        />
        <Button
          variant="outline-dark"
          className="upload-btn"
          onClick={() => document.getElementById("uploadButton").click()}
        >
          <img className="camera" alt="camera" src={Camera} />
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import Progress from "../event/Progress";
// import NavMenu from "../layout/NavBarElements";
import Footer from "../layout/Footer";

const Banner = ({ eventData, onUpdate, onNext, onBack }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpdate({ banner: file }); // Update with raw file
    }
  };

  useEffect(() => {
    if (eventData.banner) {
      const objectUrl = URL.createObjectURL(eventData.banner);
      setPreviewUrl(objectUrl);

      // Cleanup the object URL when the component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [eventData.banner]);

  return (
    <>
      <div className="container-md " style={{ height: "750px" }}>
        <h4 className="mt-5 ms-3">Upload Event Banner</h4>
        <Container className="mt-4">
          <Progress currentStep={2} />
        </Container>
        <Form className="mt-4 ms-3">
        <Form.Group className="mb-4">
          <Col md={6}>
            <Form.Label className="fw-bold">Banner Image</Form.Label>
            <Form.Control type="file" name="banner" onChange={handleChange} />
            <p className="text-muted mt-2">
              Feature Image must be at least <strong>1170px wide</strong> by{" "}
              <strong>504px high</strong>.
            </p>
            <p className="text-muted">Valid file formats: JPG, GIF, PNG.</p>
          </Col>
        </Form.Group>


          {previewUrl && (
            <div className="mt-4 text-center">
              <img
                src={previewUrl}
                alt="Event Banner Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div className="mt-5 me-5-style mb-5 text-end">
            <Button variant="secondary" onClick={onBack} className="me-3">
              Go Back to edit Event
            </Button>
            <Button variant="primary" onClick={onNext}>
              Save & Continue
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Banner;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Close from "../components/common/CloseButton";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Example backend call
      const response = await axios.post("/auth/register", formData);
      setSuccess(response.data.message);
      navigate("/SignInPage");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <Container fluid className="mt-5">
      <div className="p-4 shadow">
        <Card.Body>
          <Row className="w-100">
            {/* Left section */}
            <Col md={6} className="bg-dark text-light p-5 d-flex flex-column">
              <h3 className="mb-3 text-warning">NexusEvnt</h3>
              <h5 className="fw-light">
                Discover tailored events. <br />
                Sign up for personalized recommendations today!
              </h5>
            </Col>

            {/* Right section */}
            <Col md={6} className="p-5">
              <div
                className="form-container mx-auto"
                style={{ maxWidth: "500px" }}
              >
                <Close />
                <h2 className="mb-4 text-center">Create Account</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Button variant="dark" type="submit" className="w-100">
                    Create Account
                  </Button>
                </Form>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <a href="/SignInPage" className="text-decoration-none">
                    Log In
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </div>
    </Container>
  );
};

export default SignUp;

import React, { useState } from "react";
import axiosInstance from "../services/axiosInstance";
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
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "",
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
      const response = await axiosInstance.post("/auth/register", formData);
      setSuccess(response.data.message);
      navigate("/Login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="p-2 mt-4 mb-4 shadow w-100" style={{ maxWidth: "600px" }}>
        <Card.Body className="d-flex justify-content-center align-items-center">
          <Row className="w-100">
            <Col md={12}>
              <div className="form-container">
                <Close />
                <h2 className="mt-3 mb-4 text-center">Create Account</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="firstName" style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      placeholder="Enter your first name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-100"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lastName" style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      placeholder="Enter your last name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-100"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email" style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-100"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phoneNumber" style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_number"
                      placeholder="Enter your phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      className="w-100"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="role" style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-100"
                    >
                      <option value="">Select a role</option>
                      <option value="Attendee">Attendee</option>
                      <option value="Organizer">Organizer</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password" style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
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
                  <a href="/Login" className="text-decoration-none">
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

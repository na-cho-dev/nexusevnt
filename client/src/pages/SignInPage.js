import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Close from '../components/common/CloseButton';

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  // const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    // setSuccess("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        '/auth/login', // backend URL
        { email, password },
        { withCredentials: true } // To include cookies in the request
      );
      const { accessToken, currentUser } = response.data;
      console.log('Login successful:', accessToken);
      console.log('Current User:', currentUser);
      localStorage.setItem('accessToken', accessToken);
      // setSuccess(response.data.message || "Logged In Successfully");
      login(accessToken, currentUser);
      navigate('/profile'); // Redirect to the Home page
    } catch (error) {
      console.error(
        'Login failed:',
        error.response?.data?.message || error.message
      );
      setErrorMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="p-4 shadow">
        <Card.Body>
          <Row
            className="shadow-lg p-4 rounded w-100"
            style={{ background: 'white' }}
          >
            <Col
              md={6}
              className="d-none d-md-flex flex-column justify-content-center text-white px-4"
              style={{ background: '#1D1B31' }}
            >
              <h3>Discover tailored events.</h3>
              <p>Sign in for personalized recommendations today!</p>
            </Col>
            <Col md={6} className="p-4">
              <div
                className="form-container mx-auto"
                style={{ maxWidth: '500px' }}
              >
                <Close />
                <h3 className="text-center mb-4">Login</h3>

                <Form onSubmit={handleLogin}>
                  <Form.Group
                    controlId="email"
                    className="mb-3"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                    }}
                  >
                    <Form.Label style={{ width: '40%' }}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="password"
                    className="mb-3"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                    }}
                  >
                    <Form.Label style={{ width: '40%' }}>Password</Form.Label>
                    <InputGroup style={{ flexGrow: 1 }}>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ flexGrow: 1 }} // Input takes the remaining space
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                  <Button type="submit" variant="dark" className="w-100" disabled={loading}>
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  Don't have an account? <a href="/register">Sign up</a>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </div>
    </Container>
  );
};

export default SignIn;

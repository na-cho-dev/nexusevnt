import React, { useState } from "react";
import axios from "axios";
import '../styles/SignInPage.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`, // Replace with your backend URL
        { email, password },
        { withCredentials: true } // To include cookies in the request
      );
      const { accessToken } = response.data;
      console.log("Login successful:", accessToken);
      // Save access token to local storage or context if needed
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="sign-in-page">
      <h1>Sign In</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

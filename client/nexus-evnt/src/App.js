import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Event from "./pages/EventPage";
import Profile from "./pages/ProfilePage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Booking from "./pages/BookingPage";
import CreateEvent from "./pages/CreateEventPage";
import MultiStepForm from "./pages/MultiStepForm";
import UserDetails from "./components/event/AttendeeDetails";
import OrderSummary from "./components/event/OrderSummary";
import Account from "./components/common/AccountInfo";
import Email from "./components/common/ChangeEmail";
import Password from "./components/common/ProfPassword";
// import Testing from "./pages/Testing";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/HomePage" element={<Home />} />
          <Route path="/AboutPage" element={<About />} />
          <Route path="/ContactPage" element={<Contact />} />
          <Route path="/EventPage" element={<Event />} />
          <Route path="/ProfilePage" element={<Profile />} />
          <Route path="/SignInPage" element={<SignIn />} />
          <Route path="/SignUpPage" element={<SignUp />} />
          <Route path="/BookingPage" element={<Booking />} />
          <Route path="/CreateEventPage/*" element={<CreateEvent />} />
          <Route path="/*" element={<MultiStepForm />} />
          <Route path="/AccountInfo" element={<Account />} />
          <Route path="/ChangeEmail" element={<Email />} />
          <Route path="/ProfPassword" element={<Password />} />
          <Route path="/AttendeeDetails" element={<UserDetails />} />
          <Route path="/OrderSummary" element={<OrderSummary />} />
          {/* <Route path="/Testing" element={<Testing />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

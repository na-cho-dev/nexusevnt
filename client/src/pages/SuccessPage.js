import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");  // Get sessionId from URL if not already available
    
    if (sessionId) {
      console.log("Payment successful, Session ID:", sessionId);
  
      // Check payment status
      const handlePaymentStatus = async () => {
        try {
          const response = await axiosInstance.get(`/api/payment-status/${sessionId}`);
          console.log("Payment Status:", response.data);
          console.log("Payment Metadata:", response.data.session.metadata)
  
          if (response.data.status === "Paid") {
            const ticketId = response.data.session.metadata.ticket_id;
  
            // Mark payment as successful in localStorage with the unique ticketId
            localStorage.setItem(`paymentSuccess_${ticketId}`, "true");
            localStorage.removeItem("paymentSessionId"); // Clean up sessionId storage
  
            // Optionally, you can redirect here
            setTimeout(() => {
              navigate("/events"); // Redirect after a few seconds
            }, 4000);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      };
  
      handlePaymentStatus();
    }
  }, [sessionId, navigate]);
  
  
  

  return (
    <div className="d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: 'calc(100vh - 100px)' }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <p>Redirecting you in a moment...</p>
    </div>
  );
};

export default Success;

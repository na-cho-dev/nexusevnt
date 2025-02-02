#!/usr/bin/node
import Stripe from 'stripe';
import { handlePaymentSuccess } from '../controllers/paymentController.js';
import { handlePaymentFailure } from '../controllers/paymentController.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhookHandler = async (req, res) => {
    console.log("RECEIVED STRIPE WEBHOOK EVENT");
    const stripe_signature = req.headers["stripe-signature"]; // Stripe signature header
    const endpoint_secret = process.env.STRIPE_WEBHOOK_SECRET; // Webhook secret from Stripe Dashboard
    let stripe_event;

    try {
        // Verify webhook signature
        console.log("Stripe signature:", stripe_signature);
        console.log("Endpoint secret:", endpoint_secret);

        stripe_event = stripe.webhooks.constructEvent(
            req.body,
            stripe_signature,
            endpoint_secret
        );
        console.log(`VERIFICATION SUCCESSFULL -> Event type: ${stripe_event.type}`);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (stripe_event.type) {
        case "checkout.session.completed":
            const session_success = stripe_event.data.object;
    
            try {
                // Ensure session has necessary details before processing
                if (!session_success || !session_success.metadata || !session_success.metadata.ticket_id) {
                    console.error("Missing metadata or ticket_id in session");
                    return res.status(400).send("Invalid session data");
                }
                // Call the handlePaymentSuccess function
                await handlePaymentSuccess(session_success);
            } catch (err) {
                console.error("Error in handlePaymentSuccess:", err.message);
                return res.status(500).send("Internal Server Error");
            }
            break;
    
        case "payment_intent.succeeded":
            const payment_success = stripe_event.data.object;
            console.log("Payment SUCCEEDED:", payment_success);
            break;
    
        case "payment_intent.payment_failed":
            const payment_failed = stripe_event.data.object;
            console.log("Payment FAILED:", payment_failed);
    
            // try {
            //     // Handle failed payment (e.g., update ticket status)
            //     await handlePaymentFailure(payment_failed);
            // } catch (err) {
            //     console.error("Error processing payment failure:", err.message);
            //     return res.status(500).send("Error processing payment failure");
            // }
            break;
    
        default:
            console.log(`Unhandled event type: ${stripe_event.type}`);
            // Return an error response for unhandled event types
            return res.status(400).send(`Unhandled event type: ${stripe_event.type}`);
    }
    

    // Respond to Stripe that the webhook was received successfully
    res.json({ received: true });
};

export default stripeWebhookHandler;
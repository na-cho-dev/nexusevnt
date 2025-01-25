#!/usr/bin/node
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Stripe from 'stripe';
import mongodb_connection from './database/mongoDBConnect.js';
import authRouter from './routers/authRouter.js';
import attendeeRouter from './routers/api/attendeeRouter.js';
import organizerRouter from './routers/api/organizerRouter.js';
import eventsRouter from './routers/api/eventsRouter.js';
import ticketRouter from './routers/api/ticketRouter.js';
import corsMiddleware from './middlwares/corsMiddleware.js';
import verifyJWTMiddleware from './middlwares/verifyJWTMiddleware.js';
import cookieParser from 'cookie-parser';
import refreshTokenRouter from './routers/requestAccessTokenRouter.js';
import paymentRouter from './routers/api/paymentRouter.js';
import { handlePaymentSuccess } from './controllers/paymentController.js';  // Import handlePaymentSuccess
import { handlePaymentFailure } from './controllers/paymentController.js';  // Import handlePaymentFailure
// import dotenv from 'dotenv';

// dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const static_file_path = '../client/nexus-evnt/build'

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, static_file_path)));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/refresh', refreshTokenRouter);
app.use(verifyJWTMiddleware);
app.use('/api', eventsRouter);
app.use('/api', ticketRouter);
app.use('/api', attendeeRouter, organizerRouter);
app.use('/api', paymentRouter);

// Catch-all route to serve index.html for React's single-page app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, static_file_path, 'index.html'));
});

// Connect to the MongoDB database
mongodb_connection();


app.get('/', (req, res) => {
  res.json({ message: 'NexusEvnt Web Application!' });
});

// Middleware for raw body parsing (required for webhooks)
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }), // Use raw to handle signature verification
  async (req, res) => {
    const stripe_signature = req.headers['stripe-signature']; // Stripe signature header
    const endpoint_secret = process.env.STRIPE_WEBHOOK_SECRET; // Webhook secret from Stripe Dashboard

    let event;

    try {
      // Verify webhook signature
      stripe_event = stripe.webhooks.constructEvent(req.body, stripe_signature, endpoint_secret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (stripe_event.type) {
      case 'checkout.session.completed':
        const session_success = stripe_event.data.object;

        // Process successful payment
        await handlePaymentSuccess(session_success);

        break;

      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', stripe_event.data.object);
        break;

      case 'payment_intent.payment_failed':
        const session_failed = stripe_event.data.object;

        // Handle payment failure
        await handlePaymentFailure(session_failed);

        break;

      default:
        console.log(`Unhandled event type: ${stripe_event.type}`);
    }

    // Respond to Stripe that the webhook was received successfully
    res.json({ received: true });
  }
);

app.listen(PORT, () => {
  console.log(
    `Server started at http://localhost:${PORT} and is runnng on PORT: ${PORT}`
  );
});

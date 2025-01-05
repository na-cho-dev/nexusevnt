#!/usr/bin/node
import express from 'express';
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

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/refresh', refreshTokenRouter);
app.use(verifyJWTMiddleware);
app.use('/', eventsRouter);
app.use('/', ticketRouter);
app.use('/account', attendeeRouter, organizerRouter);
app.use('/api/create-payment-session', paymentRouter);
// app.use('/payment-status/:sessionId', getPaymentStatus);

mongodb_connection();

app.get('/', (req, res) => {
  res.json({ message: 'NexusEvnt Web Application!' });
});

// Middleware for raw body parsing (required for webhooks)
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }), // Use raw to handle signature verification
  async (req, res) => {
    const sig = req.headers['stripe-signature']; // Stripe signature header
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Webhook secret from Stripe Dashboard

    let event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        // Process successful payment
        await handlePaymentSuccess(session);

        break;

      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        break;

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

app.listen(PORT, () => {
  console.log(
    `Server started at http://localhost:${PORT} and is runnng on PORT: ${PORT}`
  );
});

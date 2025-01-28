#!/usr/bin/node
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongodb_connection from './database/mongoDBConnect.js';
import authRouter from './routers/authRouter.js';
import attendeeRouter from './routers/api/attendeeRouter.js';
import organizerRouter from './routers/api/organizerRouter.js';
import eventsRouter from './routers/api/eventsRouter.js';
import ticketRouter from './routers/api/ticketRouter.js';
import corsMiddleware from './middlwares/corsMiddleware.js';
import verifyJWTMiddleware from './middlwares/verifyJWTMiddleware.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import refreshTokenRouter from './routers/requestAccessTokenRouter.js';
import paymentRouter from './routers/api/paymentRouter.js';
import stripeWebhookHandler from './middlwares/stripeWebhookMiddleware.js';
// import dotenv from 'dotenv';

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3330;

app.use(corsMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const static_file_path = '../client/nexus-evnt/build'

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, static_file_path)));

// Webhook endpoint for Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/refresh', refreshTokenRouter);
app.use(verifyJWTMiddleware);
app.use('/api', eventsRouter);
app.use('/api', ticketRouter);
app.use('/api', attendeeRouter, organizerRouter);
app.use('/api', paymentRouter);

app.use((req, res, next) => {
  console.log(`Payload size: ${req.headers['content-length']} bytes`);
  next();
});

// Catch-all route to serve index.html for React's single-page app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, static_file_path, 'index.html'));
});

// Connect to the MongoDB database
mongodb_connection();


app.get('/', (req, res) => {
  res.json({ message: 'NexusEvnt Web Application!' });
});

app.listen(PORT, () => {
  console.log(
    `Server started at http://localhost:${PORT} and is runnng on PORT: ${PORT}`
  );
});

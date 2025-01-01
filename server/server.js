#!/usr/bin/node
import express from 'express';
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

const app = express();
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

mongodb_connection();

app.get('/', (req, res) => {
  res.json({ message: 'NexusEvnt Web Application!' });
});

app.listen(PORT, () => {
  console.log(
    `Server started at http://localhost:${PORT} and is runnng on PORT: ${PORT}`
  );
});

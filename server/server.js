#!/usr/bin/node
import express from 'express';
import db_connection from './utils/db.js';
import authRouter from './routers/authRouter.js';
import attendeeRouter from './routers/api/attendeeRouter.js';
import corsMiddleware from './middlwares/corsMiddleware.js';
import verifyJWT from './middlwares/verifyJWTMiddleware.js';
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
app.use(verifyJWT);
app.use('/user', attendeeRouter);

db_connection();

app.get('/', (req, res) => {
  res.json({ message: 'NexusEvnt Web Application!' });
});

app.listen(PORT, () => {
  console.log(
    `Server started at http://localhost:${PORT} and is runnng on PORT: ${PORT}`
  );
});

#!/usr/bin/node
import express from 'express';
import db_connection from './utils/db.js';
import authRoutes from './routers/userRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);

db_connection();

app.get('/', (req, res) => {
  res.json({ message: 'NexusEvnt Web Application!' });
});

app.listen(PORT, () => {
  console.log(
    `Server started at http://localhost:${PORT} and is runnng on PORT: ${PORT}`
  );
});

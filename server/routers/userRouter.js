import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

router.post('/user', userController);

export default router;

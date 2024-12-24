import express from 'express';
const router = express.Router();
import requestAccessTokenController from '../controllers/requestAccessTokenController.js';

router.get('/', requestAccessTokenController);

export default router;

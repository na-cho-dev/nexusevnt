import express from 'express';
import {
  createPaymentSession,
  getPaymentStatus,
} from '../../controllers/paymentController.js';
const router = express.Router();

router.post('/create-payment-session', createPaymentSession);
router.get('/payment-status/:sessionId', getPaymentStatus);

export default router;

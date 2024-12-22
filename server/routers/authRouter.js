import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import logoutController from '../controllers/logoutController.js';

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);

export default router;

import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import logoutController from '../controllers/logoutController.js';
import changePasswordController from '../controllers/changePasswordController.js';
import verifyJWT from '../middlwares/verifyJWTMiddleware.js';

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.put('/change-password', verifyJWT, changePasswordController);

export default router;

import express from 'express';
import { login, loginPage, signup, signupPage, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', loginPage);
router.post('/login', login);
router.get('/signup', signupPage);
router.post('/signup', signup);
router.get('/logout', logout);

export default router;

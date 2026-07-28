import express from 'express';
import { body } from 'express-validator';
import { register, login, refreshToken, forgotPassword, resetPassword, getProfile, updateProfile, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

router.post('/refresh-token', refreshToken);
router.post('/forgot-password', [body('email').isEmail()], forgotPassword);
router.post('/reset-password', [body('password').isLength({ min: 6 })], resetPassword);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

export default router;

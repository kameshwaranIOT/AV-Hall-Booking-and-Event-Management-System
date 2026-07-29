import express from 'express';
import { body } from 'express-validator';
import { getBookings, createBookingController, updateBookingController, deleteBookingController, approveBookingController, rejectBookingController } from '../controllers/bookingController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.get('/', protect, getBookings);
router.post(
  '/',
  protect,
  [
    body('hall').notEmpty().withMessage('Hall is required').isMongoId().withMessage('Hall must be a valid ID'),
    body('eventName').notEmpty().withMessage('Event name is required'),
    body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Date must be valid'),
    body('startTime').notEmpty().withMessage('Start time is required').matches(/^\d{2}:\d{2}$/).withMessage('Start time must be HH:mm'),
    body('endTime').notEmpty().withMessage('End time is required').matches(/^\d{2}:\d{2}$/).withMessage('End time must be HH:mm'),
    body('expectedParticipants').notEmpty().withMessage('Expected participants is required').isInt({ min: 1 }).withMessage('Expected participants must be a positive number')
  ],
  validateRequest,
  createBookingController
);
router.put('/:id', protect, updateBookingController);
router.delete('/:id', protect, deleteBookingController);
router.patch('/approve/:id', protect, authorizeRoles('admin'), approveBookingController);
router.patch('/reject/:id', protect, authorizeRoles('admin'), rejectBookingController);

export default router;

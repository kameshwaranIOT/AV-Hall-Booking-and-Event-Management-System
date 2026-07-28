import express from 'express';
import { getBookings, createBookingController, updateBookingController, deleteBookingController, approveBookingController, rejectBookingController } from '../controllers/bookingController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getBookings);
router.post('/', protect, createBookingController);
router.put('/:id', protect, updateBookingController);
router.delete('/:id', protect, deleteBookingController);
router.patch('/approve/:id', protect, authorizeRoles('admin'), approveBookingController);
router.patch('/reject/:id', protect, authorizeRoles('admin'), rejectBookingController);

export default router;

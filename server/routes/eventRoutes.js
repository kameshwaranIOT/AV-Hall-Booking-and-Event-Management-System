import express from 'express';
import { getEvents, createEventController, updateEventController, deleteEventController } from '../controllers/eventController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getEvents);
router.post('/', protect, authorizeRoles('admin'), createEventController);
router.put('/:id', protect, authorizeRoles('admin'), updateEventController);
router.delete('/:id', protect, authorizeRoles('admin'), deleteEventController);

export default router;

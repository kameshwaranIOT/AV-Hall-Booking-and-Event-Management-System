import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { getHalls, getHall, createHallController, updateHallController, deleteHallController } from '../controllers/hallController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHalls);
router.get('/:id', getHall);
router.post('/', protect, authorizeRoles('admin'), upload.array('images', 5), createHallController);
router.put('/:id', protect, authorizeRoles('admin'), upload.array('images', 5), updateHallController);
router.delete('/:id', protect, authorizeRoles('admin'), deleteHallController);

export default router;

import { catchAsync } from '../utils/errors.js';
import { listBookings, createBooking, updateBooking, deleteBooking, approveBooking, rejectBooking } from '../services/bookingService.js';

export const getBookings = catchAsync(async (req, res) => {
  const bookings = await listBookings(req.query);
  res.status(200).json({ success: true, data: bookings });
});

export const createBookingController = catchAsync(async (req, res) => {
  const booking = await createBooking({ ...req.body, user: req.user._id });
  res.status(201).json({ success: true, data: booking });
});

export const updateBookingController = catchAsync(async (req, res) => {
  const booking = await updateBooking(req.params.id, req.body);
  res.status(200).json({ success: true, data: booking });
});

export const deleteBookingController = catchAsync(async (req, res) => {
  const result = await deleteBooking(req.params.id);
  res.status(200).json({ success: true, data: result });
});

export const approveBookingController = catchAsync(async (req, res) => {
  const booking = await approveBooking(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: booking });
});

export const rejectBookingController = catchAsync(async (req, res) => {
  const booking = await rejectBooking(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: booking });
});

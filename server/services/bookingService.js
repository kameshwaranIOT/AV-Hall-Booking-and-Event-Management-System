import Booking from '../models/Booking.js';
import Hall from '../models/Hall.js';
import Notification from '../models/Notification.js';
import AppError from '../utils/errors.js';

export const listBookings = async (query = {}) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.user) filter.user = query.user;
  if (query.hall) filter.hall = query.hall;
  return Booking.find(filter).populate('user hall').sort({ createdAt: -1 });
};

export const createBooking = async (data) => {
  const { hall, date, startTime, endTime } = data;
  const conflicting = await Booking.findOne({ hall, date, status: { $in: ['pending', 'approved'] }, $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }] });
  if (conflicting) throw new AppError('This hall is already booked.', 400);
  const booking = await Booking.create(data);
  await Notification.create({ user: data.user, message: 'Booking submitted successfully.' });
  return booking;
};

export const updateBooking = async (id, data) => {
  const booking = await Booking.findByIdAndUpdate(id, data, { new: true });
  if (!booking) throw new AppError('Booking not found', 404);
  return booking;
};

export const deleteBooking = async (id) => {
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) throw new AppError('Booking not found', 404);
  return { message: 'Booking deleted successfully' };
};

export const approveBooking = async (id, adminId) => {
  const booking = await Booking.findByIdAndUpdate(id, { status: 'approved', approvedBy: adminId }, { new: true });
  if (!booking) throw new AppError('Booking not found', 404);
  await Notification.create({ user: booking.user, message: 'Booking approved.' });
  return booking;
};

export const rejectBooking = async (id, adminId) => {
  const booking = await Booking.findByIdAndUpdate(id, { status: 'rejected', approvedBy: adminId }, { new: true });
  if (!booking) throw new AppError('Booking not found', 404);
  await Notification.create({ user: booking.user, message: 'Booking rejected.' });
  return booking;
};

import Event from '../models/Event.js';
import AppError from '../utils/errors.js';

export const listEvents = async () => Event.find().sort({ createdAt: -1 });

export const createEvent = async (data) => Event.create(data);

export const updateEvent = async (id, data) => {
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  if (!event) throw new AppError('Event not found', 404);
  return event;
};

export const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new AppError('Event not found', 404);
  return { message: 'Event deleted successfully' };
};

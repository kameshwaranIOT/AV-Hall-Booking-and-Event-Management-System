import { catchAsync } from '../utils/errors.js';
import { listEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService.js';

export const getEvents = catchAsync(async (req, res) => {
  const events = await listEvents();
  res.status(200).json({ success: true, data: events });
});

export const createEventController = catchAsync(async (req, res) => {
  const event = await createEvent(req.body);
  res.status(201).json({ success: true, data: event });
});

export const updateEventController = catchAsync(async (req, res) => {
  const event = await updateEvent(req.params.id, req.body);
  res.status(200).json({ success: true, data: event });
});

export const deleteEventController = catchAsync(async (req, res) => {
  const result = await deleteEvent(req.params.id);
  res.status(200).json({ success: true, data: result });
});

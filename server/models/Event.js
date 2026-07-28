import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  organizer: { type: String, required: true },
  venue: { type: String, required: true },
  participants: { type: Number, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;

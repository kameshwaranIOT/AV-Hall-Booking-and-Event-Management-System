import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String, default: '' },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  expectedParticipants: { type: Number, required: true },
  equipmentRequired: [{ type: String }],
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

bookingSchema.index({ hall: 1, date: 1, startTime: 1, endTime: 1 });
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

import mongoose from 'mongoose';

const hallSchema = new mongoose.Schema({
  hallName: { type: String, required: true, trim: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  equipment: [{ type: String }],
  images: [{ type: String }],
  status: { type: String, enum: ['available', 'maintenance'], default: 'available' },
  createdAt: { type: Date, default: Date.now }
});

hallSchema.index({ hallName: 'text', location: 'text' });
const Hall = mongoose.model('Hall', hallSchema);
export default Hall;

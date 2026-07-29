import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hall from './models/Hall.js';
import connectDB from './config/db.js';

dotenv.config();

const sampleHalls = [
  {
    hallName: 'Main Auditorium',
    capacity: 300,
    location: 'Building A',
    description: 'Large auditorium with stage, projector, and sound system.',
    equipment: ['Projector', 'Sound System', 'Stage Lighting']
  },
  {
    hallName: 'Conference Room 1',
    capacity: 40,
    location: 'Building B',
    description: 'Medium-sized conference room for meetings and workshops.',
    equipment: ['Whiteboard', 'Conference Phone']
  },
  {
    hallName: 'Training Hall',
    capacity: 120,
    location: 'Building C',
    description: 'Training hall with multiple seating arrangements and AV support.',
    equipment: ['Projector', 'Microphones', 'Video Conferencing']
  }
];

const seedHalls = async () => {
  try {
    await connectDB();
    const existing = await Hall.countDocuments();
    if (existing === 0) {
      await Hall.insertMany(sampleHalls);
      console.log('Sample halls seeded successfully.');
    } else {
      console.log('Sample halls already exist.');
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedHalls();

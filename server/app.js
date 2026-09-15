import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import Hall from './models/Hall.js';
import authRoutes from './routes/authRoutes.js';
import hallRoutes from './routes/hallRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

dotenv.config();

const seedDefaultHalls = async () => {
  try {
    const hallCount = await Hall.countDocuments();
    if (hallCount === 0) {
      await Hall.insertMany([
        {
          hallName: 'Main Auditorium',
          capacity: 300,
          location: 'Building A',
          description: 'Large auditorium with stage, projector, and sound system.',
          equipment: ['Projector', 'Sound System', 'Stage Lighting'],
          status: 'available',
        },
        {
          hallName: 'Conference Room 1',
          capacity: 40,
          location: 'Building B',
          description: 'Medium-sized conference room for meetings and workshops.',
          equipment: ['Whiteboard', 'Conference Phone'],
          status: 'available',
        },
        {
          hallName: 'Training Hall',
          capacity: 120,
          location: 'Building C',
          description: 'Training hall with multiple seating arrangements and AV support.',
          equipment: ['Projector', 'Microphones', 'Video Conferencing'],
          status: 'available',
        },
      ]);
      console.log('Sample halls seeded successfully.');
    }
  } catch (error) {
    console.error('Hall seeding error:', error.message);
  }
};

connectDB().then(seedDefaultHalls);

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

export default app;

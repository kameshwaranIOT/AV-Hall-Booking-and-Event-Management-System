# AV Hall Booking and Event Management System

## Project Description
A production-ready full-stack web application for managing AV hall bookings, events, users, notifications, and admin operations.

## Features
- Authentication and role-based access
- Hall management
- Booking workflow with conflict prevention
- Admin dashboard
- User dashboard
- Notifications
- Responsive UI

## Installation
1. Install server dependencies:
   - cd server && npm install
2. Install client dependencies:
   - cd client && npm install
3. Start the server:
   - cd server && npm run dev
4. Start the client:
   - cd client && npm start

## Environment Variables
See server/.env.example

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/halls
- POST /api/bookings

## Folder Structure
- client/src for frontend components/pages
- server for backend API and models

## Future Enhancements
- PDF/CSV/Excel reports
- Advanced analytics and calendar drag-and-drop
- Email notifications and image uploads

## License
MIT

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

## Deploying to Vercel

Deploy the `client` and `server` folders as two separate Vercel projects:

1. Import the repository into Vercel and set the project root to `server`.
2. Add the server environment variables from `server/.env.example`, including a MongoDB Atlas connection string and `CLIENT_URL` set to the deployed client URL.
3. Deploy the server and copy its URL.
4. Create a second Vercel project from the same repository with the project root set to `client`.
5. Add `REACT_APP_API_URL` with the server URL followed by `/api`, then redeploy the client.

The server includes `server/api/index.js` and `server/vercel.json` for Vercel's serverless Node runtime. Vercel deployments do not provide durable local storage, so uploaded files should use object storage instead of `server/uploads` for production.

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

import { catchAsync } from '../utils/errors.js';
import { listNotifications, markAsRead } from '../services/notificationService.js';
import { sendEmail } from '../services/emailService.js';

export const getNotifications = catchAsync(async (req, res) => {
  const notifications = await listNotifications(req.user._id);
  res.status(200).json({ success: true, data: notifications });
});

export const markNotificationRead = catchAsync(async (req, res) => {
  const notification = await markAsRead(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: notification });
});

export const sendNotificationEmail = catchAsync(async (req, res) => {
  const { to, subject, message } = req.body;
  const result = await sendEmail({ to, subject, html: `<p>${message}</p>` });
  res.status(200).json({ success: true, data: result });
});

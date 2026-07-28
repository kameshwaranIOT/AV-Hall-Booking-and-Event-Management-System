import Notification from '../models/Notification.js';
import AppError from '../utils/errors.js';

export const listNotifications = async (userId) => Notification.find({ user: userId }).sort({ createdAt: -1 });

export const markAsRead = async (id, userId) => {
  const notification = await Notification.findOneAndUpdate({ _id: id, user: userId }, { read: true }, { new: true });
  if (!notification) throw new AppError('Notification not found', 404);
  return notification;
};

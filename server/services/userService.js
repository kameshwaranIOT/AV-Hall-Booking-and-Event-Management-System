import User from '../models/User.js';
import AppError from '../utils/errors.js';

export const listUsers = async () => User.find().select('-password').sort({ createdAt: -1 });

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateUserRole = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError('User not found', 404);
  return { message: 'User deleted successfully' };
};

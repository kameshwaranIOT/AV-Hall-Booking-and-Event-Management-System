import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import AppError from '../utils/errors.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
const generateRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });

export const registerUser = async ({ name, email, password, department, phone, role }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new AppError('Email already exists', 400);

  const user = await User.create({ name, email, password, department, phone, role });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user._id), refreshToken: generateRefreshToken(user._id) };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError('Invalid credentials', 401);

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user._id), refreshToken: generateRefreshToken(user._id) };
};

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) throw new AppError('Refresh token required', 401);
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError('User not found', 401);
  return { token: generateToken(user._id) };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  return { resetToken };
};

export const resetPasswordService = async ({ token, password }) => {
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) throw new AppError('Invalid or expired reset token', 400);
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return { message: 'Password reset successful' };
};

export const updateProfileService = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateProfileImageService = async (userId, imagePath) => {
  const user = await User.findByIdAndUpdate(userId, { profileImage: imagePath }, { new: true }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new AppError('User not found', 404);
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) throw new AppError('Current password is incorrect', 400);
  user.password = newPassword;
  await user.save();
  return { message: 'Password changed successfully' };
};

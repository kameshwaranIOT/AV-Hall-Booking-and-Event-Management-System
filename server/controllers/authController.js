import { catchAsync } from '../utils/errors.js';
import { registerUser, loginUser, refreshTokenService, forgotPasswordService, resetPasswordService, updateProfileService, changePasswordService } from '../services/authService.js';

export const register = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json({ success: true, data: result });
});

export const login = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);
  res.status(200).json({ success: true, data: result });
});

export const refreshToken = catchAsync(async (req, res) => {
  const result = await refreshTokenService(req.body.refreshToken);
  res.status(200).json({ success: true, data: result });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const result = await forgotPasswordService(req.body.email);
  res.status(200).json({ success: true, data: result });
});

export const resetPassword = catchAsync(async (req, res) => {
  const result = await resetPasswordService(req.body);
  res.status(200).json({ success: true, data: result });
});

export const getProfile = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

export const updateProfile = catchAsync(async (req, res) => {
  const user = await updateProfileService(req.user._id, req.body);
  res.status(200).json({ success: true, data: user });
});

export const changePassword = catchAsync(async (req, res) => {
  const result = await changePasswordService(req.user._id, req.body.currentPassword, req.body.newPassword);
  res.status(200).json({ success: true, data: result });
});

import { catchAsync } from '../utils/errors.js';
import { listUsers, getUserById, updateUserRole, deleteUser } from '../services/userService.js';

export const getUsers = catchAsync(async (req, res) => {
  const users = await listUsers();
  res.status(200).json({ success: true, data: users });
});

export const getUser = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json({ success: true, data: user });
});

export const updateUser = catchAsync(async (req, res) => {
  const user = await updateUserRole(req.params.id, req.body);
  res.status(200).json({ success: true, data: user });
});

export const deleteUserController = catchAsync(async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.status(200).json({ success: true, data: result });
});

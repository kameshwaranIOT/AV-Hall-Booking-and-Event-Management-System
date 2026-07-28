import Hall from '../models/Hall.js';
import AppError from '../utils/errors.js';

export const listHalls = async (query = {}) => {
  const { search, status, capacity, department } = query;
  const filter = {};
  if (search) filter.$or = [{ hallName: { $regex: search, $options: 'i' } }, { location: { $regex: search, $options: 'i' } }];
  if (status) filter.status = status;
  if (capacity) filter.capacity = { $gte: Number(capacity) };
  return Hall.find(filter).sort({ createdAt: -1 });
};

export const getHallById = async (id) => {
  const hall = await Hall.findById(id);
  if (!hall) throw new AppError('Hall not found', 404);
  return hall;
};

export const createHall = async (data) => {
  return Hall.create(data);
};

export const updateHall = async (id, data) => {
  const hall = await Hall.findByIdAndUpdate(id, data, { new: true });
  if (!hall) throw new AppError('Hall not found', 404);
  return hall;
};

export const deleteHall = async (id) => {
  const hall = await Hall.findByIdAndDelete(id);
  if (!hall) throw new AppError('Hall not found', 404);
  return { message: 'Hall deleted successfully' };
};

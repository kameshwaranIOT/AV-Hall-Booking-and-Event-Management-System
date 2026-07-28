import { catchAsync } from '../utils/errors.js';
import { listHalls, getHallById, createHall, updateHall, deleteHall } from '../services/hallService.js';

const extractImages = (req) => {
  if (!req.files) return [];
  return req.files.map((file) => file.path);
};

export const getHalls = catchAsync(async (req, res) => {
  const halls = await listHalls(req.query);
  res.status(200).json({ success: true, data: halls });
});

export const getHall = catchAsync(async (req, res) => {
  const hall = await getHallById(req.params.id);
  res.status(200).json({ success: true, data: hall });
});

export const createHallController = catchAsync(async (req, res) => {
  const data = { ...req.body, images: extractImages(req) };
  const hall = await createHall(data);
  res.status(201).json({ success: true, data: hall });
});

export const updateHallController = catchAsync(async (req, res) => {
  const data = { ...req.body };
  const images = extractImages(req);
  if (images.length) data.images = images;
  const hall = await updateHall(req.params.id, data);
  res.status(200).json({ success: true, data: hall });
});

export const deleteHallController = catchAsync(async (req, res) => {
  const result = await deleteHall(req.params.id);
  res.status(200).json({ success: true, data: result });
});

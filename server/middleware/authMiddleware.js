import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/errors.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError('Not authorized', 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) throw new AppError('User not found', 401);
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return next(new AppError('Forbidden', 403));
  }
  next();
};

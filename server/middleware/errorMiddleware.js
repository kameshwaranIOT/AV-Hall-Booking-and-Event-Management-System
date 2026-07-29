import AppError from '../utils/errors.js';

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack || err);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  return res.status(500).json({ success: false, message: 'Internal Server Error' });
};

export default errorMiddleware;

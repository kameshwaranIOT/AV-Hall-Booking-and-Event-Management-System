import AppError from '../utils/errors.js';

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack || err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  return res.status(500).json({ success: false, message: 'Internal Server Error' });
};

export default errorMiddleware;

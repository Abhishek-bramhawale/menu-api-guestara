
const errorHandler = (err, req, res, next) =>{
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(error => error.message).join(', ');
  }

  // Mongoose duplicate key error
  if (err.code === 11000){
    statusCode = 400;
    message = 'Duplicate entry. This name already exists.';
  }

  // Mongoose cast error 
  if (err.name === 'CastError'){
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;


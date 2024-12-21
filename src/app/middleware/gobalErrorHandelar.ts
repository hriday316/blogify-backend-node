/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';
import config from '../config';
import { ZodError } from 'zod';

const globalErrorHandelar: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: ' ',
      message: 'Something went wrong',
    },
  ];

  // handle types of error such as sod error, validation error ,cast error etc
  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    statusCode = zodError?.statusCode;
    message = zodError?.message;
    errorSources = zodError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const validationError = handleValidationError(err);
    statusCode = validationError?.statusCode;
    message = validationError?.message;
    errorSources = validationError?.errorSources;
  } else if (err?.code === 11000) {
    const duplicateError = handleDuplicateError(err);
    statusCode = duplicateError?.statusCode;
    message = duplicateError?.message;
    errorSources = duplicateError?.errorSources;
  } else if (err?.name === 'CastError') {
    const castError = handleCastError(err);
    statusCode = castError?.statusCode;
    message = castError?.message;
    errorSources = castError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  //  error response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandelar;

/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.send(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api is not found',
    error: ' ',
  });
};

export default notFound;

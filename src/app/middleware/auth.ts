import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/User/user.model';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { TUserRole } from '../modules/User/user.constant';

interface CustomRequest extends Request {
  user: JwtPayload;
}

// auth middleware
const auth = (...reuiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req?.headers?.authorization?.split(' ')[1];

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
      }
      // check token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { userId, role } = decoded;
      const user = await User.findById({ _id: userId }).select('+password');
      const isBlocked = user?.isBlocked;

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
      }

      if (isBlocked) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This user is blocked');
      }
      if (reuiredRoles && !reuiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
      }
      // set token into req
      req.user = decoded as JwtPayload;

      next();
    },
  );
};

export default auth;

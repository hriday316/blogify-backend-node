import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { Blog } from '../modules/Blog/blog.model';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';

// checker middleware check blog and blog's owner
const checker = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check blog isExist
    const blog = await Blog.findById({ _id: req.params.id });

    if (!blog) {
      throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    const userId = req?.user?.userId;
    const authorId = blog?.author?.toString();

    // check blog author and user
    if (userId !== authorId) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is unauthorized29');
    }

    next();
  });
};

export default checker;

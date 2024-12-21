import AppError from '../../errors/AppError';
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';
import httpStatus from 'http-status';

// block user
const blockedUser = async (userId: string) => {
  const payload = { isBlocked: true };
  const result = await User.findByIdAndUpdate(userId, payload);
  return result;
};

// delete blog
const deleteBlogFromDB = async (blogId: string) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'This blog is not found');
  }
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

export const AdminServices = { blockedUser, deleteBlogFromDB };

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

// create blog by user
const createBlog = catchAsync(async (req, res) => {
  const blogData = req.body;
  const userId = req?.user?.userId;
  blogData.author = userId;

  const result = await BlogServices.createBlogIntoDB(blogData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created  succesfully',
    data: result,
  });
});

// get all blogs (public)
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched succesfully',
    data: result,
  });
});

// update blog by user
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated succesfully',
    data: result,
  });
});

// delete blog by user
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BlogServices.deleteBlogIntoDB(id);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Blog deleted succesfully',
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};

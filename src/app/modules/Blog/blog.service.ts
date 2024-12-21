import QueryBuilder from '../../builder/QueryBuilder';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

// create blog
const createBlogIntoDB = async (payload: TBlog) => {
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

// get all blogs (public)
const getAllBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];
  const blogsQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(searchableFields)
    .filter()
    .sort();

  const result = await blogsQuery.modelQuery;

  return result;
};

// update blog
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  }).populate('author');
  return result;
};

// delete blog
const deleteBlogIntoDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete({ _id: id }, { new: true });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
  getAllBlogs,
};

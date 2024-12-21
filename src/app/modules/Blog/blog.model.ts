import mongoose, { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new mongoose.Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author is required'],
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Blog = model<TBlog>('Blog', blogSchema);

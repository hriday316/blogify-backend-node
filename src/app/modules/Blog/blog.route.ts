import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import checker from '../../middleware/checker';

const router = express.Router();

// create blog route
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

// get all blogs route(public)
router.get('/', BlogControllers.getAllBlogs);

// blog update route
router.patch(
  '/:id',
  auth(USER_ROLE.user),
  checker(),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

// blog delete route
router.delete(
  '/:id',
  auth(USER_ROLE.user),
  checker(),
  BlogControllers.deleteBlog,
);

export const BlogRoute = router;

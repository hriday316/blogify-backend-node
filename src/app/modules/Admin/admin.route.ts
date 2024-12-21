import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { AdminControllers } from './admin.controller';

const router = express.Router();

// blocked  user
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockedUser,
);

// delete blog
router.delete(
  '/blogs/:blogId',
  auth(USER_ROLE.admin),
  AdminControllers.deleteBlog,
);

export const AdminRoute = router;

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.post(
  '/login',
  validateRequest(UserValidations.loginUserValidationSchema),
  UserControllers.loginUser,
);

export const userRouter = router;

import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .max(10, { message: 'Password cannot be more than 10 charecter' })
      .min(6, { message: 'Password must be more than 5 charecter' }),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};

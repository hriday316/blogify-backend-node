/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// hash password before save into database
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//  check password
userSchema.statics.isPasswordMatched = async function (
  password: string,
  hashPassword: string,
) {
  return await bcrypt.compare(password, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);

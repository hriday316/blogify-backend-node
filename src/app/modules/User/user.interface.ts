import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export type TLogin = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(password: string, hashPassword: string): Promise<boolean>;
}

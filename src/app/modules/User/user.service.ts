import AppError from '../../errors/AppError';
import { TLogin, TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import { createToken } from './user.utils';
import config from '../../config';

// create user
const createUserIntoDB = async (payload: Partial<TUser>) => {
  const isUserExist = await User.findOne({ email: payload?.email });
  if (isUserExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User registration requires a unique email address; the provided email is already in use',
    );
  }
  const result = await User.create(payload);
  const { name, email, _id } = result;
  return { _id, name, email };
};

const loginUser = async (payload: TLogin) => {
  const { email } = payload;

  const user = await User.findOne({ email }).select('+password');

  // check user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // check user isBlocked
  if (user?.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is blocked');
  }

  // check valid password
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(401, 'Invalid credentials');
  }

  //  create token and sent to the clint
  const jwtPayload = { userId: user._id, role: user.role };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string,
  );

  return { accessToken };
};
export const UserServices = { createUserIntoDB, loginUser };

import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

// block user by admin
const blockedUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminServices.blockedUser(userId);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'User blocked succesfully',
  });
});

// delete blogs by admin
const deleteBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  await AdminServices.deleteBlogFromDB(blogId);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Blog deleted succesfully',
  });
});

export const AdminControllers = { blockedUser, deleteBlog };

import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandelar from './app/middleware/gobalErrorHandelar';
import { userRouter } from './app/modules/User/user.route';
import notFound from './app/middleware/notFound';
import cookieParser from 'cookie-parser';
import { BlogRoute } from './app/modules/Blog/blog.route';
import { AdminRoute } from './app/modules/Admin/admin.route';

const app = express();

// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routes
app.use('/api/auth', userRouter);
app.use('/api/blogs', BlogRoute);
app.use('/api/admin', AdminRoute);

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to blogify-backend');
});

// error response middleware
app.use(globalErrorHandelar);
app.use(notFound);

export default app;

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  dburl: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SOLT_ROUND,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.ACCESS_TOKEN_SECRET,
  jwt_refresh_secret: process.env.REFRESH_TOKEN_SECRET,
  jwt_access_expiresIn: process.env.ACCESS_EXPIRES_IN,
  jwt_refresh_expiresIn: process.env.REFRESH_EXPIRES_IN,
};

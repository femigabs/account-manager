import 'dotenv/config';

export default {
  DATABASE_HOST: process.env.DEV_DATABASE_HOST,
  DATABASE_PORT: process.env.DEV_DATABASE_PORT,
  DATABASE_USER: process.env.DEV_DATABASE_USER,
  DATABASE_PASSWORD: process.env.DEV_DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DEV_DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  PORT: process.env.PORT,
  API_VERSION: process.env.API_VERSION,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY_DURATION: process.env.JWT_EXPIRY_DURATION,
};

import 'dotenv/config';

export default {
  DATABASE_HOST: process.env.PROD_DATABASE_HOST,
  DATABASE_PORT: process.env.PROD_DATABASE_PORT,
  DATABASE_USER: process.env.PROD_DATABASE_USER,
  DATABASE_PASSWORD: process.env.PROD_DATABASE_PASSWORD,
  DATABASE_NAME: process.env.PROD_DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  PORT: process.env.PORT,
  API_VERSION: process.env.API_VERSION,
  NODE_ENV: process.env.NODE_ENV,
};

const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DEV_DATABASE_HOST,
      port: process.env.DEV_DATABASE_PORT,
      user: process.env.DEV_DATABASE_USER,
      password: process.env.DEV_DATABASE_PASSWORD,
      database: process.env.DEV_DATABASE_NAME,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },

  test: {
    client: 'mysql2',
    connection: {
      host: process.env.TEST_DATABASE_HOST,
      port: process.env.TEST_DATABASE_PORT,
      user: process.env.TEST_DATABASE_USER,
      password: process.env.TEST_DATABASE_PASSWORD,
      database: process.env.TEST_DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.PROD_DATABASE_HOST,
      port: process.env.PROD_DATABASE_PORT,
      user: process.env.PROD_DATABASE_USER,
      password: process.env.PROD_DATABASE_PASSWORD,
      database: process.env.PROD_DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },

};

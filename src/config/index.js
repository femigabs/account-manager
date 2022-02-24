import knex from 'knex';
import config from './env';
import appConfig from './express';
import knexConfig from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const configuration = knexConfig[environment];
const db = knex(configuration);

export {
  config, appConfig, db,
};

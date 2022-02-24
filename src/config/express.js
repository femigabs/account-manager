/* eslint-disable import/no-cycle */
import fs from 'fs';
import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import FileStreamRotator from 'file-stream-rotator';
import cors from 'cors';
import loggerInit from './logger';
import routes from '../routes/v1/index';
import { Error, errorResponse } from '../utils/response';

const logDirectory = './logs';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const expressConfig = (app) => {
  let accessLogStream;
  let logger;

  // initialize logger
  if (app.get('env') === 'development') {
    logger = loggerInit('development');
  } else if (app.get('env') === 'production') {
    logger = loggerInit('production');
  } else if (app.get('env') === 'test') {
    logger = loggerInit('test');
  } else {
    logger = loggerInit();
  }

  global.logger = logger;
  logger.info('Application starting...');
  logger.debug('Overriding \'Express\' logger');

  if (checkLogDir) {
    accessLogStream = FileStreamRotator.getStream({
      date_format: 'YYYYMMDD',
      filename: `${logDirectory}/access-%DATE%.log`,
      frequency: 'weekly',
      verbose: false,
    });
  }

  app.use(morgan('combined', { stream: accessLogStream }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Use helmet to secure Express headers
  app.use(helmet());
  app.disable('x-powered-by');
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use('/api/v1', routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => next(Error('Route Not Found', 404)));

  // error handlers
  // will print stacktrace
  app.use((err, req, res, next) => {
    errorResponse(err, req, res);
  });
};

export default expressConfig;

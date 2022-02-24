import express from 'express';
import { config, appConfig, db } from './src/config';

const app = express();
const host = config.APP_HOST;
const port = config.PORT || 8080;
const apiVersion = config.API_VERSION;

appConfig(app);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${apiVersion}/`);
});

export default app;

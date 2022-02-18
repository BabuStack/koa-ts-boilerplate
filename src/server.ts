import 'reflect-metadata';
import app from './app';
import config from './config';
import AppInit from './init';
import ip from 'ip';
import logger from './lib/logger';


async function startServer() {
  try {
    await AppInit();
  } catch (error) {
    logger.error('Failed during Application initialization: ' + error.message);
    return;
  }

  app.listen(config.port, (err?: Error) => {
    if (err) {
      logger.error('Failed to start server due to:' + err.message);
    } else {
      logger.info('Node version: ' + process.version);
      logger.info('Server running on: ' + `${ip.address()}:${config.port}`);
    }
  });
}


startServer();

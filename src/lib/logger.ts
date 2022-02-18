import winston, { format, transports } from 'winston';
import als from 'async-local-storage';
import config from 'src/config';
import path from 'path';

winston.configure({
  level      : config.debugLogging ? 'silly' : 'info',
  transports : [
    // - Write all logs error (and below) to `error.log`.
    new transports.File({
      filename : path.resolve(__dirname, '../../logs/error.log'),
      level    : 'error', 
    }),
    
    // - Write to all logs with specified level to console.
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
  ],
});

const getCommonMeta = () => ({
  requestID : als.get('reqID'),
  requestIP : als.get('reqIP'),
});

const logger = {
  log: function(level: string, message: string) {
    winston.log(level, message, getCommonMeta());
  },
  error: (message: string) => {
    winston.error(message, getCommonMeta());
  },
  warn: (message: string) => {
    winston.warn(message, getCommonMeta());
  },
  verbose: (message: string) => {
    winston.verbose(message, getCommonMeta());
  },
  info: (message: string) => {
    winston.info(message, getCommonMeta());
  },
  debug: (message: string) => {
    winston.debug(message, getCommonMeta());
  },
  silly: (message: string) => {
    winston.silly(message, getCommonMeta());
  },
};

export default logger;

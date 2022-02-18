import type { Middleware } from 'koa';
import logger from 'src/lib/logger';


const requestLogger = (): Middleware  => {
  return async (ctx, next) => {
    const start = new Date().getTime();
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
    const latency = new Date().getTime() - start;

    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else {
      logLevel = 'info';
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${latency}ms`;

    logger.log(logLevel, msg);
  };
};

export default requestLogger;

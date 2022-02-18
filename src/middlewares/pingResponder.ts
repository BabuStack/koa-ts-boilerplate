import Router from 'koa-router';
import logger from 'src/lib/logger';

const pingRouter = new Router();

pingRouter.get('/ping', (ctx) => {
  logger.silly('pinging now');
  ctx.body = {
    ping: 'success',
  };
});

export default pingRouter;

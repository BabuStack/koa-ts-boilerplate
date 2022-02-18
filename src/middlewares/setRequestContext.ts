import als from 'async-local-storage';
import requestIp from 'request-ip';
import {Middleware} from 'koa';
import {ICtxState} from 'src/types';
import {v4 as uuidv4} from 'uuid';

// Enable/Initialize als
als.enable();

/**
 * Logger Id middleware
 * Adds req.logger which will log
 * req.id on every log
 */
export default function setRequestContext(): Middleware<ICtxState> {
  return (ctx, next) => {
    ctx.state.reqId = ctx.get('x-request-id') || uuidv4();
    ctx.set('request-id', ctx.state.reqId);
    
    als.scope();
    als.set('reqID', ctx.state.reqId);
    als.set('reqIP', requestIp.getClientIp(ctx.req));

    next();
  };
}

import Koa from 'koa';
import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import passport from 'koa-passport';
import requestLogger from './middlewares/requestLogger';
import config from './config';
import setRequestContext from './middlewares/setRequestContext';
import pingResponder from './middlewares/pingResponder';

const app = new Koa();


// Enable cors with default options
app.use(cors());

// For health check calls from docker
app.use(pingResponder.routes()).use(pingResponder.allowedMethods());

// Will add source IP and request ID
// als, such that the same can be 
// used during orchestration, logging etc
app.use(setRequestContext());

// Enable bodyParser with default options
app.use(bodyParser());

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(requestLogger());

// Initialize Passport
app.use(passport.initialize());

// these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
// app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// do not protect swagger-json and swagger-html endpoints
app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

// These routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
// app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());


export default app;

import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import config from 'src/config';
import koaJWT from 'koa-jwt';


export interface JWTPayload {
  sub: string;
}

function sign(userId: string) {
  const token = jwt.sign(
    {
      sub : userId,
      iat : Math.floor(Date.now() / 1000),
      jti : new ObjectId(),
    },
    config.jwtSecret,
    {
      algorithm: 'HS256',
    }
  );

  return token;
}

function middleware() {
  return koaJWT({
    secret     : config.jwtSecret,
    algorithms : ['HS256'], 
  });
}

const JWT = {
  sign,
  middleware,
};

export default JWT;

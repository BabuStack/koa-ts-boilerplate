import dotenv from 'dotenv-safe';

dotenv.config({ path: '.env' });

export interface Config {
  port: number;
  debugLogging: boolean;
  jwtSecret: string;
  mongoConnectURL: string;
  mongoDBName: string;
}

const isDevMode = process.env.NODE_ENV == 'development';

const config: Config = {
  port            : +process.env.PORT,
  debugLogging    : isDevMode,
  jwtSecret       : process.env.JWT_SECRET,
  mongoConnectURL : process.env.MONGO_CONNECTION_URL,
  mongoDBName     : process.env.MONGO_DB_NAME,
};

export default config;

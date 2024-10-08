import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'ci', 'test', 'staging', 'production', 'demo')
    .default('production'),
  PORT: Joi.number().port().default(3000),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGIN: Joi.string().default('localhost'),

  AUTH_SECRET: Joi.string().required(),
  AUTH_TOKEN_LIFETIME: Joi.alternatives(Joi.string(), Joi.number()).default('1d'),
  AUTH_REFRESH_TOKEN_LIFETIME: Joi.alternatives(Joi.string(), Joi.number()).default('30d'),

  MONGO_URL: Joi.string().required(),
});

export interface Config {
  env: string;
  port: number;
  globalPrefix: string;
  cors: CorsOptions;
  auth: {
    secret: string;
    tokenLifetime: number | string;
    refreshTokenLifetime: number | string;
  };
  mongoUrl: string;
}

export const configFactory = (): Config => {
  return {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT),
    globalPrefix: process.env.GLOBAL_PREFIX,
    cors: {
      origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map(
            (origin) => new RegExp(`^https?://${origin}:?[0-9]*$`),
          )
        : false,
    },
    auth: {
      secret: process.env.AUTH_SECRET,
      tokenLifetime: process.env.AUTH_TOKEN_LIFETIME,
      refreshTokenLifetime: process.env.AUTH_REFRESH_TOKEN_LIFETIME,
    },
    mongoUrl: process.env.MONGO_URL,
  };
};

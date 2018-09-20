import * as Joi from 'joi';
import { EnvConfig } from './env-config.interface';

const envVarsSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid(['development', 'production']),
  APP_URL: Joi.string().uri().required(),
  APP_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_SECRET: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  SPOTIFY_CLIENT_ID: Joi.string().required(),
  SPOTIFY_CLIENT_SECRET: Joi.string().required(),
  SPOTIFY_REDIRECT_URL: Joi.string().required(),
});

export const validateEnvConfig = (envConfig: EnvConfig) => Joi.validate(
  envConfig,
  envVarsSchema,
);
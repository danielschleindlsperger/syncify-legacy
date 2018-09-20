import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvConfig } from './env-config.interface';
import { validateEnvConfig } from './validate-config';

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = validateEnvConfig(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get environment() { return this.envConfig.NODE_ENV };

  get appUrl() { return this.envConfig.APP_URL; }

  get appPort() { return this.envConfig.APP_PORT; }

  get databaseHostName() { return this.envConfig.DB_HOST; }

  get databaseUser() { return this.envConfig.DB_USER; }

  get databaseSecret() { return this.envConfig.DB_SECRET; }

  get databasePort() { return this.envConfig.DB_PORT; }

  get databaseName() { return this.envConfig.DB_NAME; }

  get spotifyClientId() { return this.envConfig.SPOTIFY_CLIENT_ID; }

  get spotifyClientSecret() { return this.envConfig.SPOTIFY_CLIENT_SECRET; }

  get spotifyRedirectUrl() { return this.envConfig.SPOTIFY_REDIRECT_URL; }
};
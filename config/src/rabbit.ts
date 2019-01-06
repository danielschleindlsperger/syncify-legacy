import { Config, EnvValue } from 'type-env'

@Config
export class RabbitConfig {
  @EnvValue('RABBIT_USER')
  user: string = 'root'

  @EnvValue('RABBIT_SECRET')
  secret: string = 'root'

  @EnvValue('RABBIT_HOST')
  host: string = 'localhost'

  get connectionString() {
    return `amqp://${this.user}:${this.secret}@${this.host}`
  }
}

export const rabbit = new RabbitConfig()

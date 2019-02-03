import { Rabbit } from 'rabbit-queue'
import { Config } from '../config'

const {
  rabbit: { connectionString },
} = Config
let connected = false
let queue: Rabbit

export const Queue = {
  init() {
    queue = new Rabbit(connectionString, {
      prefetch: 1,
      replyPattern: true,
      scheduledPublish: true,
      prefix: 'syncify',
      socketOptions: {},
    })
    return Queue.get()
  },
  get: async (): Promise<Rabbit> =>
    connected
      ? Promise.resolve(queue)
      : new Promise(resolve => {
          queue.on('connected', () => {
            connected = true
            resolve(queue)
          })

          queue.on('disconnected', () => {
            setTimeout(() => {
              console.log('Could not connect to RabbitMQ. Reconnecting in 2s.')
              queue.reconnect()
            }, 2000)
          })
        }),
}

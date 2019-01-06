import { Rabbit } from 'rabbit-queue'
import { Config } from 'syncify-config'

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
      : new Promise((resolve, reject) => {
          queue.on('connected', () => {
            resolve(queue)
            connected = true
          })

          queue.on('disconnected', () => {
            reject(queue)
          })
        }),
}

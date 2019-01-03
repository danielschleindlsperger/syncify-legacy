import { Rabbit } from 'rabbit-queue'

// amqp://user:pass@host.com/vhost

let connected = false
let rabbit: Rabbit

export const Queue = {
  init() {
    rabbit = new Rabbit(process.env.RABBIT_URL || 'amqp://root:root@localhost', {
      prefetch: 1, //default prefetch from queue
      replyPattern: true, //if reply pattern is enabled an exclusive queue is created
      scheduledPublish: true,
      prefix: 'syncify', //prefix all queues with an application name
      socketOptions: {}, // socketOptions will be passed as a second param to amqp.connect and from ther to the socket library (net or tls)
    })
  },
  connect: async (): Promise<Rabbit> =>
    connected
      ? Promise.resolve(rabbit)
      : new Promise((resolve, reject) => {
          Queue.init()
          rabbit.on('connected', () => {
            resolve(rabbit)
            connected = true
          })

          rabbit.on('disconnected', () => {
            reject(rabbit)
          })
        }),
  dispatch: (queueName: string, value: any, delay: number = 0) =>
    rabbit
      .publishWithDelay(queueName, value, { expiration: delay })
      .then(() => console.log('message will be published')),
}

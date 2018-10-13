import { createServer, IncomingMessage, ServerResponse } from 'http'
import chalk from 'chalk'
import { Configuration } from '../config'

export namespace Server {
  const { host, port } = Configuration

  const onListen = () => {
    console.info(chalk.green('[server] running'), `@ http://${host}:${port}/`)
  }

  const onClose = () => {
    console.info(chalk.green(`[server] stopped`))
  }

  const onError = (error: Error) => {
    console.error(chalk.red('[server] errored'), error.message)
  }

  export const create = async (
    app: (req: IncomingMessage, res: ServerResponse) => void
  ) =>
    createServer(app)
      .listen(port, onListen)
      .on('close', onClose)
      .on('error', onError)
}

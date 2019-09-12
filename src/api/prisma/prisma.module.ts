import { Module, Provider } from '@nestjs/common'
import { prisma } from '../../generated/prisma-client'

export const prismaToken = Symbol('Prisma DI Token')

const prismaProvider: Provider = {
  provide: prismaToken,
  useFactory: () => {
    // for some reason beyond me the prisma instance has a `then` method that never resolves. This means
    // the Nest DI Container waits forever and subsequently hangs when bootstrapping the application.
    const prismaInstance = Object.assign({}, prisma)
    delete prismaInstance.then
    return prismaInstance
  },
}

@Module({
  providers: [prismaProvider],
  exports: [prismaProvider],
})
export class PrismaModule {}

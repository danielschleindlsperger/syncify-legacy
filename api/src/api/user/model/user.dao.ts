import { getRepository } from 'typeorm'
import { from } from 'rxjs'
import { User } from './user'
import { SECURED_FIELDS, PUBLIC_FIELDS } from './user.entity'

const userRepository = () => getRepository('User')

export const userDao = {
  all: () => from(userRepository().find()),
  allPublic: () => from(userRepository().find({ select: PUBLIC_FIELDS })),
  create: (user: User) => from(userRepository().save(user)),
  findById: (id: string) => from(userRepository().findOneOrFail({ id })),
  findByIdSecured: (id: string) =>
    from(userRepository().findOneOrFail({ id, select: SECURED_FIELDS })),
  findByIdPublic: (id: string) =>
    from(userRepository().findOneOrFail({ id, select: PUBLIC_FIELDS })),
}

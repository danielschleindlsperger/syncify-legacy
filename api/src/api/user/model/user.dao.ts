import { getRepository } from 'typeorm'
import { from, Observable } from 'rxjs'
import { User } from './user'
import { SECURED_FIELDS, PUBLIC_FIELDS } from './user.entity'

const userRepository = () => getRepository('user')

export const UserDAO = {
  all: () => from(userRepository().find()),
  allPublic: () => from(userRepository().find({ select: PUBLIC_FIELDS })),
  save: (user: User) => from(userRepository().save(user)),
  findById: (id: string) => from(userRepository().findOneOrFail({ id })) as Observable<User>,
  findByIdSecured: (id: string) =>
    from(
      userRepository().findOneOrFail({
        id,
        select: SECURED_FIELDS,
      }),
    ),
  findByIdPublic: (id: string) =>
    from(
      userRepository().findOneOrFail({
        id,
        select: PUBLIC_FIELDS,
      }),
    ),
}

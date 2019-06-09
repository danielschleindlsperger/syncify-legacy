import { r, use } from '@marblejs/core'
import { mapTo, map, flatMap } from 'rxjs/operators'
import { t, requestValidator$ } from '@marblejs/middleware-io'
import { UserDAO, UserEntity } from '../user'
import { UnreachableCaseError } from '../../util'
import { of, from, throwError } from 'rxjs'
import { getRepository } from 'typeorm'
import { Config } from '../../config'

const MemberAddedEvent = t.type({
  name: t.literal('member_added'),
  channel: t.string,
  user_id: t.string,
})

type MemberAddedEvent = t.TypeOf<typeof MemberAddedEvent>

const MemberRemovedEvent = t.type({
  name: t.literal('member_removed'),
  channel: t.string,
  user_id: t.string,
})

type MemberRemovedEvent = t.TypeOf<typeof MemberRemovedEvent>

const PusherPresenceEvent = t.union([MemberAddedEvent, MemberRemovedEvent])

type PusherPresenceEvent = t.TypeOf<typeof PusherPresenceEvent>

const PusherEvent = t.type({
  time_ms: t.number,
  events: t.tuple([PusherPresenceEvent]),
})

type PusherEvent = t.TypeOf<typeof PusherEvent>

export const pusherPresenceWebhook$ = r.pipe(
  r.matchPath('/presence'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      flatMap(req => {
        const isValidPusherRequest = req.headers['x-pusher-key'] === Config.pusher.key
        return isValidPusherRequest
          ? of(req)
          : throwError(new Error('Illegal request. Pusher key did not match.'))
      }),
      use(requestValidator$({ body: PusherEvent })),
      map(req => req.body.events[0]),
      flatMap(event => {
        switch (event.name) {
          case 'member_added':
            return of({})
          case 'member_removed':
            return handleMemberRemoved(event)
          default:
            throw new UnreachableCaseError(event)
        }
      }),
      mapTo({ body: 'OK' }),
    ),
  ),
)

const handleMemberRemoved = (event: MemberRemovedEvent) =>
  UserDAO.findById(event.user_id).pipe(
    flatMap(user =>
      from(
        getRepository(UserEntity)
          .createQueryBuilder()
          .relation('room')
          .of(user)
          .set(null),
      ),
    ),
  )

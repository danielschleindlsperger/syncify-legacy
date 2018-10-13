import { Effect, EffectFactory, httpListener } from '@marblejs/core'

// mounts an effect in an application and returns it
// useful for testing otherwise hard to test effects
export const mountEffect = (effect: Effect) => {
  const endpointEffect$ = EffectFactory.matchPath('/')
    .matchType('GET')
    .use(effect)
  const app = httpListener({ effects: [endpointEffect$] })
  return app
}

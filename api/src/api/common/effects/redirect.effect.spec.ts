import { HttpRequest, HttpResponse } from '@marblejs/core'
import { of } from 'rxjs'
import { redirectEffect$ } from './redirect.effect'
import * as MockReq from 'mock-req'

describe('redirectEffect$', () => {
  it('sets response to redirect to specified url', done => {
    const request = new MockReq()
    const response = {} as HttpResponse
    const req$ = of(request as HttpRequest)

    redirectEffect$('http://example.com')(req$, response, {}).subscribe(
      res => {
        expect(res.status).toBe(302)
        expect(res.headers).toStrictEqual({ Location: 'http://example.com' })
        done()
      },
      () => {
        throw new Error('Should not error')
      },
    )
  })
})

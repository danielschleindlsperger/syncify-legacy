describe('auth resolvers', () => {
  describe('authorize()', () => {
    it.todo('is authenticated')
    describe('when provided with `code`', () => {
      it.todo('calls spotify api to exchange for tokens')
      it.todo('calls spotify for user info')
      it.todo('saves user')
      it.todo('responds with access token and expires')
    })
    describe('no code', () => {
      it.todo('uses refresh token to get new access token')
      it.todo('responds with access token and expires')
    })
  })
})

module.exports = {
  ...jest.requireActual('../jwt.ts'),
  signToken: jest.fn(() => 'TOKEN'),
  verifyToken: jest.fn().mockReturnValue({ id: 'ID' }),
}

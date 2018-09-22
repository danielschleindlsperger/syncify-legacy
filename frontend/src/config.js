// TODO: store such things in global .env files
// Use the ones from backend but move to mono repo root

export const config = {
  API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://syncify.com',
  LOGIN_PATH: '/auth/login',
}
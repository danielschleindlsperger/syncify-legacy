const isDev = window.location.href.startsWith('http://localhost')

export const config = {
  baseUrl: isDev ? 'http://localhost:8080' : 'https://syncify.co',
}

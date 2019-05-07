# Environment Configuration

| ENV_VAR               | Default value                        | Comment                                                         |
| --------------------- | ------------------------------------ | --------------------------------------------------------------- |
| NODE_ENV              | production                           | production / development / test                                 |
| APP_URL               | https://syncify.co                   | Url pointing the frontend application                           |
| API_URL               | https://syncify.co/api               | Url pointing to the backend api                                 |
| REAL_TIME_URL         | https://syncify.co/real-time         | Url pointing to the real-time backend application               |
| DB_HOST               | 123.123.123.123                      | MySQL host name                                                 |
| DB_PORT               | 3306                                 | MySQL port                                                      |
| DB_NAME               | syncify                              | MySQL database name                                             |
| DB_USER               | root                                 | MySQL user name                                                 |
| DB_SECRET             | hunter2                              | MySQL secret                                                    |
| REDIS_URL             | redis://localhost:6379               | Redis connection url, Env var is provided by Heroku Redis addon |
| SPOTIFY_CLIENT_ID     |                                      | Spotify Web API client id                                       |
| SPOTIFY_CLIENT_SECRET |                                      | Spotify Web API client secret                                   |
| SPOTIFY_REDIRECT_URL  | https://syncify.co/api/auth/callback | Callback url for Spotify OAuth redirects                        |
| JWT_SECRET            | hunter2                              | Secret used for Web Token Encryption                            |

# Syncify

![Build Artifacts Status](https://github.com/danielschleindlsperger/syncify/workflows/Build%20and%20deploy/badge.svg)

Syncify is a synchronized listening room experience for Spotify. Think community radio. [syncify.co](https://syncify.co)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Up and running](#up-and-running)
- [Routes](#routes)

## Prerequisites

- [Node.js 12](https://nodejs.org/en/)

## Environment

A list of all environment variables across all applications with a little explanation can be [found here](./documentation/environment-configuration.md)

For a development environment copy the provided `.env.example` file once for your local instance and once for tests (might be the same file).

```bash
mv .env.example .env
mv .env.example .env.test


```

Afterwards fill in the unprovided credentials.

## Up and running

### NPM Commands

```bash
npm install

# start all apps locally
npm start

# run tests for all apps
npm t
```

Now you can access the whole app on [localhost:8080](http://localhost:8080)

## Routes

| Route                   | Description                                  | Handler                                                 |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------- |
| `/api/auth/trade-token` | Trade Spotify `code` for access tokens       | [handler](src/api/modules/auth/handlers/trade-token.ts) |
| `/api/auth/refresh`     | Call when authorized to get refreshed tokens | [handler](src/api/modules/auth/handlers/refresh.ts)     |
| `/api/room/{id}`        | Get data for room with id                    | [handler](src/api/modules/rooms/handlers/show.ts)       |

## Infrastructure as Code

```bash
sls create_domain # custom api gateway domain

sls deploy # lambdas, cloudfront, databases

```

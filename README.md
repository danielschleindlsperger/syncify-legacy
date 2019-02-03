# Syncify

Syncify is a synchronized listening room experience for Spotify. Think community radio. [syncify.co](https://syncify.co)

## Table of Contents

- [REST-API Documentation](api/README.md)
- [Frontend Documentation](frontend/README.md)
- [Prerequisites](#prerequisites)
- [Up and running](#up-and-running)
- [Deployment](./documentation/deployment.md)

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= 8 (with npm >= 5)
- [Docker](https://www.docker.com/get-docker)

## Environment

A list of all environment variables across all applications with a little explanation can be [found here](./documentation/environment-configuration.md)

For a development environment copy the provided `.env.example` file once for your local instance and once for tests (might be the same file).

```bash
mv .env.example .env
mv .env.example .env.test
```

Afterwards fill in the unprovided credentials (Spotify, etc..).

## Up and running

### NPM Commands

```bash
# install all dependencies
npm run bootstrap

# start containers and apps
npm start

# run tests for all apps
npm t

# start all containers
npm run docker
```

Now you can access the whole app on [localhost:8080](http://localhost:8080)

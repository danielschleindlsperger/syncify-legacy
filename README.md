# Syncify

Syncify is a synchronized listening room experience for Spotify. Think community radio.

## Table of Contents

- [REST-API Dokumentation](api/README.md)
- [Frontend Dokumentation](frontend/README.md)
- [Prerequisites](#prerequisites)
- [Up and running](#up-and-running)

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= 8 (with npm >= 5)
- [Docker](https://www.docker.com/get-docker)

## Environment

For a development environment copy the provided `.env.example` file once for your local instance and once for tests (might be the same file).

```bash
mv .env.example .env
mv .env.example .env.test
```

Afterwards fill in the unprovided credentials (Spotify, etc..).

## Up and running

```bash
# start containers
npm run docker

# install all dependencies
npm run install:all

# start containers and apps
npm run start:all
```

Now you can access the whole app on [localhost:8080](http://localhost:8080)

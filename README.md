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

## Up and running
```bash
# start docker containers
$ npm run docker:up

# stop docker containers
$ npm run docker:down

# install all dependencies
$ npm run install:all

# run all apps in dev mode
$ npm run start:all

```
## Prerequisites
- [Node.js](https://nodejs.org/en/) >= 8
- [Docker](https://www.docker.com/get-docker)

## Up and running

### Docker
- Download and start all containers: `$ docker-compose up --detach`
- Stop all containers: `$ docker-compose stop`
- Stop and remove all containers: `$ docker-compose down` (database is still persisted in volume)

### app
```bash
# install dependencies
$ npm install

# run app in dev mode
$ npm start

# run app in production
$ npm run build && npm run serve

# run and optionally watch tests
$ npm t -- --watch

# run linter
$ npm run lint
```
# Database Seeder

## How to use

```bash
$ npm run db:seed # Runs all seeders
$ npm run db:drop # Drops database
```

## New Seeder

Add a new seeder in `seeders` with a signature of `type Seeder = (connection: Connection) => Promise<any>`. Register it in the seeders array in `seeders/index.ts`. Done.

import { EntitySchema } from 'typeorm'
import { pipe, keys, path, omit } from 'ramda'

// returns the fields of an entity schema minus excludes
export const entityWithoutFields = (excludes: string[]) => (entity: EntitySchema) =>
  pipe(
    path(['options', 'columns']),
    omit(excludes),
    keys,
  )(entity)

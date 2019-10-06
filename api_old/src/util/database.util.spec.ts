import { EntitySchema } from 'typeorm'
import { entityWithoutFields } from './database.util'

type Model = {
  name: string
  password: string
}

const ModelEntity = new EntitySchema<Model>({
  name: 'User',
  columns: {
    name: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
})

describe('entityWithoutFields', () => {
  it('takes an entity and returns all its fields without the excluded ones', () => {
    const selectFields = entityWithoutFields(['password'])(ModelEntity)
    expect(selectFields).toStrictEqual(['name'])
  })
})

const { Entity, PrimaryColumn, Column } = require('typeorm')
const { construct } = require('ramda')

@Entity()
class User {
  constructor(props) {
    Object.assign(this, props)
  }

  @PrimaryColumn('varchar')
  id = undefined

  @Column('varchar')
  name = undefined;

  @Column('varchar')
  accessToken = '';

  @Column('varchar')
  refreshToken = '';

  @Column('int')
  validUntil = 0;
}

const user = construct(User)

module.exports = {
  User,
  user,
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UserTableAvatarNullable1550011122648 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'user',
      'avatar',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    )
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'user',
      'avatar',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: false,
      }),
    )
  }
}

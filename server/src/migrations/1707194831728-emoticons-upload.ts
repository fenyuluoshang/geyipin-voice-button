import { MigrationInterface, QueryRunner } from 'typeorm'

export class EmoticonsUpload1707194831728 implements MigrationInterface {
  name = 'EmoticonsUpload1707194831728'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "emoticons" DROP COLUMN "title"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "emoticons" ADD "title" character varying NOT NULL`)
  }
}

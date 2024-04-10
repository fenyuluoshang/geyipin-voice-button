import { MigrationInterface, QueryRunner } from 'typeorm'

export class AnchorExt1712752954258 implements MigrationInterface {
  name = 'AnchorExt1712752954258'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "anchor" ADD "homepageExt" json`)
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "playTime" SET DEFAULT 0`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "playTime" SET DEFAULT '0'`)
    await queryRunner.query(`ALTER TABLE "anchor" DROP COLUMN "homepageExt"`)
  }
}

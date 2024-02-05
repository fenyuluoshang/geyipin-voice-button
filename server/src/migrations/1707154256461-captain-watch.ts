import { MigrationInterface, QueryRunner } from 'typeorm'

export class CaptainWatch1707154256461 implements MigrationInterface {
  name = 'CaptainWatch1707154256461'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blive_captain_model" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "anchorId" integer NOT NULL, "sums" integer NOT NULL DEFAULT '0', CONSTRAINT "REL_1c2aa7f16f6c37175c4cbecb3f" UNIQUE ("anchorId"), CONSTRAINT "PK_e215ba790274bb1941c7b1bd6ce" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "playTime" SET DEFAULT 0`)
    await queryRunner.query(
      `ALTER TABLE "blive_captain_model" ADD CONSTRAINT "FK_1c2aa7f16f6c37175c4cbecb3f3" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blive_captain_model" DROP CONSTRAINT "FK_1c2aa7f16f6c37175c4cbecb3f3"`
    )
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "playTime" SET DEFAULT '0'`)
    await queryRunner.query(`DROP TABLE "blive_captain_model"`)
  }
}

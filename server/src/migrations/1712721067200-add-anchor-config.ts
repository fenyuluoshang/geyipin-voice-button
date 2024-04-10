import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAnchorConfig1712721067200 implements MigrationInterface {
  name = 'AddAnchorConfig1712721067200'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "anchor" ADD "favIcon" character varying`)
    await queryRunner.query(`ALTER TABLE "anchor" ADD "icon" character varying`)
    await queryRunner.query(`ALTER TABLE "anchor" ADD "bgImg" character varying`)
    await queryRunner.query(`ALTER TABLE "anchor" ADD "bgImgDark" character varying`)
    await queryRunner.query(`ALTER TABLE "voices" DROP CONSTRAINT "FK_407f576053a60f246c6b966b4d0"`)
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "anchorId" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "playTime" SET DEFAULT 0`)
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag" DROP CONSTRAINT "FK_3dbfb4cd6283d5f025445a3c0dd"`
    )
    await queryRunner.query(`ALTER TABLE "emoticon_tag" ALTER COLUMN "anchorId" SET NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "emoticons" DROP CONSTRAINT "FK_54478de50fabb75ee4003dbcac6"`
    )
    await queryRunner.query(`ALTER TABLE "emoticons" ALTER COLUMN "anchorId" SET NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "voice_tag" DROP CONSTRAINT "FK_4d4cb28dfa99c32a767d190b6a0"`
    )
    await queryRunner.query(`ALTER TABLE "voice_tag" ALTER COLUMN "anchorId" SET NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "voices" ADD CONSTRAINT "FK_407f576053a60f246c6b966b4d0" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag" ADD CONSTRAINT "FK_3dbfb4cd6283d5f025445a3c0dd" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticons" ADD CONSTRAINT "FK_54478de50fabb75ee4003dbcac6" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "voice_tag" ADD CONSTRAINT "FK_4d4cb28dfa99c32a767d190b6a0" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "voice_tag" DROP CONSTRAINT "FK_4d4cb28dfa99c32a767d190b6a0"`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticons" DROP CONSTRAINT "FK_54478de50fabb75ee4003dbcac6"`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag" DROP CONSTRAINT "FK_3dbfb4cd6283d5f025445a3c0dd"`
    )
    await queryRunner.query(`ALTER TABLE "voices" DROP CONSTRAINT "FK_407f576053a60f246c6b966b4d0"`)
    await queryRunner.query(`ALTER TABLE "voice_tag" ALTER COLUMN "anchorId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "voice_tag" ADD CONSTRAINT "FK_4d4cb28dfa99c32a767d190b6a0" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(`ALTER TABLE "emoticons" ALTER COLUMN "anchorId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "emoticons" ADD CONSTRAINT "FK_54478de50fabb75ee4003dbcac6" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(`ALTER TABLE "emoticon_tag" ALTER COLUMN "anchorId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag" ADD CONSTRAINT "FK_3dbfb4cd6283d5f025445a3c0dd" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "playTime" SET DEFAULT '0'`)
    await queryRunner.query(`ALTER TABLE "voices" ALTER COLUMN "anchorId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "voices" ADD CONSTRAINT "FK_407f576053a60f246c6b966b4d0" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(`ALTER TABLE "anchor" DROP COLUMN "bgImgDark"`)
    await queryRunner.query(`ALTER TABLE "anchor" DROP COLUMN "bgImg"`)
    await queryRunner.query(`ALTER TABLE "anchor" DROP COLUMN "icon"`)
    await queryRunner.query(`ALTER TABLE "anchor" DROP COLUMN "favIcon"`)
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1705561051539 implements MigrationInterface {
  name = 'Init1705561051539'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "anchor" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "anchorName" character varying NOT NULL, "anchorTitle" character varying NOT NULL, "biliId" integer, "biliveId" integer, "lastVideoBV" character varying, "primaryColor" character varying, "secondColor" character varying, "primaryColorDark" character varying, "secondColorDark" character varying, "btnColor" character varying, CONSTRAINT "PK_8cba1ff69c3a6b412d36f4e9db7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "voices" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "source" character varying, "playTime" bigint NOT NULL, "anchorId" integer, CONSTRAINT "PK_e9aca1140ce459e098f259fcc47" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "voice_tag" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "anchorId" integer, CONSTRAINT "PK_85f7c03636f3f9014180f72a1db" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "phone_encode" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying NOT NULL, "code" integer NOT NULL, "expirTime" TIMESTAMP NOT NULL, "hasUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7bd40672bd672bc3b032c03a665" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "mail_encode" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "mail" character varying NOT NULL, "code" integer NOT NULL, "expirTime" TIMESTAMP NOT NULL, "hasUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d71b114a91b0b2e1a063968373d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "nickName" character varying, "phone" character varying, "mail" character varying, "pass" character varying, "salt" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `)
    await queryRunner.query(
      `CREATE TABLE "emoticons" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "source" character varying, CONSTRAINT "PK_54d4808a3f59e8faae332a906c7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "voices" ADD CONSTRAINT "FK_407f576053a60f246c6b966b4d0" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "voice_tag" ADD CONSTRAINT "FK_4d4cb28dfa99c32a767d190b6a0" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "voice_tag" DROP CONSTRAINT "FK_4d4cb28dfa99c32a767d190b6a0"`
    )
    await queryRunner.query(`ALTER TABLE "voices" DROP CONSTRAINT "FK_407f576053a60f246c6b966b4d0"`)
    await queryRunner.query(`DROP TABLE "emoticons"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "mail_encode"`)
    await queryRunner.query(`DROP TABLE "phone_encode"`)
    await queryRunner.query(`DROP TABLE "voice_tag"`)
    await queryRunner.query(`DROP TABLE "voices"`)
    await queryRunner.query(`DROP TABLE "anchor"`)
  }
}

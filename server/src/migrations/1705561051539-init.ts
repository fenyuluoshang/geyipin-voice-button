import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1705561051539 implements MigrationInterface {
  name = 'Init1705561051539'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "emoticon_tag" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "anchorId" integer, CONSTRAINT "PK_4ae88ba2fcd3044cc6bacab0788" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "emoticons" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "source" character varying, "anchorId" integer, CONSTRAINT "PK_54d4808a3f59e8faae332a906c7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "anchor" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "anchorName" character varying NOT NULL, "anchorTitle" character varying NOT NULL, "pathName" character varying NOT NULL, "biliId" integer, "biliveId" integer, "lastVideoBV" character varying, "primaryColor" character varying, "secondColor" character varying, "primaryColorDark" character varying, "secondColorDark" character varying, "btnColor" character varying, CONSTRAINT "PK_8cba1ff69c3a6b412d36f4e9db7" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_b5abce0a6d2a772fe933e84cc0" ON "anchor" ("pathName") `
    )
    await queryRunner.query(
      `CREATE TABLE "voice_tag" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "anchorId" integer, CONSTRAINT "PK_85f7c03636f3f9014180f72a1db" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "voices" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "source" character varying, "playTime" bigint NOT NULL, "anchorId" integer, CONSTRAINT "PK_e9aca1140ce459e098f259fcc47" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user_group" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, CONSTRAINT "PK_3c29fba6fe013ec8724378ce7c9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "nickName" character varying, "phone" character varying, "mail" character varying, "pass" character varying, "salt" character varying, "groupId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `)
    await queryRunner.query(`CREATE INDEX "IDX_8e1f623798118e629b46a9e629" ON "user" ("phone") `)
    await queryRunner.query(`CREATE INDEX "IDX_7395ecde6cda2e7fe90253ec59" ON "user" ("mail") `)
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "roleStr" character varying NOT NULL, "userId" integer, "groupId" integer, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "phone_encode" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying NOT NULL, "code" character varying(12) NOT NULL, "expirTime" TIMESTAMP NOT NULL, "hasUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7bd40672bd672bc3b032c03a665" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c4983eeb0655832583fb91bad8" ON "phone_encode" ("phone") `
    )
    await queryRunner.query(
      `CREATE TABLE "mail_encode" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "mail" character varying NOT NULL, "code" character varying(12) NOT NULL, "expirTime" TIMESTAMP NOT NULL, "hasUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d71b114a91b0b2e1a063968373d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_244fd198a2237b1cd7a20a9a17" ON "mail_encode" ("mail") `
    )
    await queryRunner.query(
      `CREATE TABLE "emoticon_tag_emoticons_emoticons" ("emoticonTagId" integer NOT NULL, "emoticonsId" integer NOT NULL, CONSTRAINT "PK_a03483a2be24646ce88b3ff4464" PRIMARY KEY ("emoticonTagId", "emoticonsId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_62ef94eab99b58564601943ae2" ON "emoticon_tag_emoticons_emoticons" ("emoticonTagId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_0ad6c49036e75f37131b6efa2b" ON "emoticon_tag_emoticons_emoticons" ("emoticonsId") `
    )
    await queryRunner.query(
      `CREATE TABLE "voices_tags_voice_tag" ("voicesId" integer NOT NULL, "voiceTagId" integer NOT NULL, CONSTRAINT "PK_e2d55582a786bee07034cdacb9a" PRIMARY KEY ("voicesId", "voiceTagId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_3f4642ec6b6d800d5c78619009" ON "voices_tags_voice_tag" ("voicesId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_64ec14ba5e4cb327e7b2f458c0" ON "voices_tags_voice_tag" ("voiceTagId") `
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
    await queryRunner.query(
      `ALTER TABLE "voices" ADD CONSTRAINT "FK_407f576053a60f246c6b966b4d0" FOREIGN KEY ("anchorId") REFERENCES "anchor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051" FOREIGN KEY ("groupId") REFERENCES "user_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_3a26994d34035aaa72db4f05425" FOREIGN KEY ("groupId") REFERENCES "user_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag_emoticons_emoticons" ADD CONSTRAINT "FK_62ef94eab99b58564601943ae2d" FOREIGN KEY ("emoticonTagId") REFERENCES "emoticon_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag_emoticons_emoticons" ADD CONSTRAINT "FK_0ad6c49036e75f37131b6efa2bb" FOREIGN KEY ("emoticonsId") REFERENCES "emoticons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "voices_tags_voice_tag" ADD CONSTRAINT "FK_3f4642ec6b6d800d5c786190090" FOREIGN KEY ("voicesId") REFERENCES "voices"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "voices_tags_voice_tag" ADD CONSTRAINT "FK_64ec14ba5e4cb327e7b2f458c0a" FOREIGN KEY ("voiceTagId") REFERENCES "voice_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "voices_tags_voice_tag" DROP CONSTRAINT "FK_64ec14ba5e4cb327e7b2f458c0a"`
    )
    await queryRunner.query(
      `ALTER TABLE "voices_tags_voice_tag" DROP CONSTRAINT "FK_3f4642ec6b6d800d5c786190090"`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag_emoticons_emoticons" DROP CONSTRAINT "FK_0ad6c49036e75f37131b6efa2bb"`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag_emoticons_emoticons" DROP CONSTRAINT "FK_62ef94eab99b58564601943ae2d"`
    )
    await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3a26994d34035aaa72db4f05425"`)
    await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`)
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_974590e8d8d4ceb64e30c38e051"`)
    await queryRunner.query(`ALTER TABLE "voices" DROP CONSTRAINT "FK_407f576053a60f246c6b966b4d0"`)
    await queryRunner.query(
      `ALTER TABLE "voice_tag" DROP CONSTRAINT "FK_4d4cb28dfa99c32a767d190b6a0"`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticons" DROP CONSTRAINT "FK_54478de50fabb75ee4003dbcac6"`
    )
    await queryRunner.query(
      `ALTER TABLE "emoticon_tag" DROP CONSTRAINT "FK_3dbfb4cd6283d5f025445a3c0dd"`
    )
    await queryRunner.query(`DROP INDEX "public"."IDX_64ec14ba5e4cb327e7b2f458c0"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_3f4642ec6b6d800d5c78619009"`)
    await queryRunner.query(`DROP TABLE "voices_tags_voice_tag"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_0ad6c49036e75f37131b6efa2b"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_62ef94eab99b58564601943ae2"`)
    await queryRunner.query(`DROP TABLE "emoticon_tag_emoticons_emoticons"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_244fd198a2237b1cd7a20a9a17"`)
    await queryRunner.query(`DROP TABLE "mail_encode"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_c4983eeb0655832583fb91bad8"`)
    await queryRunner.query(`DROP TABLE "phone_encode"`)
    await queryRunner.query(`DROP TABLE "role"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_7395ecde6cda2e7fe90253ec59"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_8e1f623798118e629b46a9e629"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "user_group"`)
    await queryRunner.query(`DROP TABLE "voices"`)
    await queryRunner.query(`DROP TABLE "voice_tag"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_b5abce0a6d2a772fe933e84cc0"`)
    await queryRunner.query(`DROP TABLE "anchor"`)
    await queryRunner.query(`DROP TABLE "emoticons"`)
    await queryRunner.query(`DROP TABLE "emoticon_tag"`)
  }
}

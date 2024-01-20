import { createHash } from 'node:crypto'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDatas1705561147109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 初始化鸽子的主页
    queryRunner.query(
      `INSERT INTO "anchor"("id", "anchorName", "anchorTitle", "pathName", "biliId", "biliveId", "lastVideoBV", "primaryColor", "secondColor", "primaryColorDark", "secondColorDark", "btnColor")
      VALUES(1, '鸽一品', '天才鸽', 'tiancaige', 11399495, 4910271, 'BV1jt4y1o72U','#784fb5', '#c1adf4', '#784fb5', '#6838b0', '#784fb5')`
    )

    queryRunner.query(`SELECT setval('anchor_id_seq', max(id)) FROM "anchor"`)

    queryRunner.query(`INSERT INTO "user_group"("id", "title") VALUES(1, '')`)

    queryRunner.query(`SELECT setval('user_group_id_seq', max(id)) FROM "user_group"`)

    const salt = Math.floor(1000 + Math.random() * 9000).toString()
    const Md5Password = createHash('md5').update(`admin:${salt}`).digest('hex').toString()
    queryRunner.query(
      `INSERT INTO "user"("name", "nickName", "pass", "salt", "groupId") VALUES('admin', '系统超级管理员', $1, $2, 1)`,
      [Md5Password, salt]
    )

    queryRunner.query(`INSERT INTO "role"("roleStr", "userId") VALUES('**', 1)`)
    queryRunner.query(`INSERT INTO "role"("roleStr", "groupId") VALUES('**', 1)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DELETE FROM "anchor" WHERE anchorName='鸽一品'
    `)
    queryRunner.query(`
    DELETE FROM "user" WHERE name='admin'
    `)
  }
}

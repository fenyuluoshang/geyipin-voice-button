import { createHash } from 'node:crypto'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDatas1705561147109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 初始化鸽子的主页
    queryRunner.query(
      `INSERT INTO "anchor"("id", "anchorName", "anchorTitle", "pathName", "biliId", "biliveId", "lastVideoBV", "primaryColor", "secondColor", "primaryColorDark", "secondColorDark", "btnColor")
      VALUES(1, '鸽一品', '天才鸽', 'tiancaige', 11399495, 4910271, 'BV1jt4y1o72U','#784fb5', '#c1adf4', '#784fb5', '#6838b0', '#784fb5')`
    )

    const salt = Math.floor(1000 + Math.random() * 9000).toString()
    const Md5Password = createHash('md5').update(`admin:${salt}`).digest('hex').toString()
    queryRunner.query(
      `INSERT INTO "user"("name", "nickName", "pass", "salt") VALUES('admin', '系统超级管理员', $1, $2)`,
      [Md5Password, salt]
    )
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

import { MD5 } from 'crypto-js'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDatas1705561147109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 初始化鸽子的主页
    queryRunner.query(
      `INSERT INTO "anchor"("id", "anchorName", "anchorTitle", "biliId", "biliveId", "lastVideoBV", "primaryColor", "secondColor", "primaryColorDark", "secondColorDark", "btnColor")
      VALUES(1, '鸽一品', '天才鸽', 11399495, 4910271, 'BV1jt4y1o72U','#784fb5', '#c1adf4', '#784fb5', '#6838b0', '#784fb5')`
    )

    const salt = Math.floor(1000 + Math.random() * 9000).toString()
    queryRunner.query(
      `INSERT INTO "user"("name", "nickName", "pass", "salt") VALUES('admin', 'Admin', $1, $2)`,
      [MD5(`admin:${salt}`).toString(), salt]
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM "anchor" WHERE anchorName='鸽一品'
        `)
  }
}

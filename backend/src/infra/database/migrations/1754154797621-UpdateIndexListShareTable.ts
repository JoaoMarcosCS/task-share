import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIndexListShareTable1754154797621 implements MigrationInterface {
    name = 'UpdateIndexListShareTable1754154797621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list-share" DROP CONSTRAINT "FK_eccda0cadce510597b466ca3a09"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP CONSTRAINT "FK_dbf3537326ae15b377bc21ef655"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP COLUMN "taskListIdId"`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD "taskListId" uuid`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1c9b0129769f1cd229a9c9e3c0" ON "list-share" ("userId", "taskListId") `);
        await queryRunner.query(`ALTER TABLE "list-share" ADD CONSTRAINT "FK_6af8940ce5b7c6c2488ac8e8274" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD CONSTRAINT "FK_6775ac5bb8aab297d195ce4453e" FOREIGN KEY ("taskListId") REFERENCES "task-list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list-share" DROP CONSTRAINT "FK_6775ac5bb8aab297d195ce4453e"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP CONSTRAINT "FK_6af8940ce5b7c6c2488ac8e8274"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c9b0129769f1cd229a9c9e3c0"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP COLUMN "taskListId"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD "taskListIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD CONSTRAINT "FK_dbf3537326ae15b377bc21ef655" FOREIGN KEY ("taskListIdId") REFERENCES "task-list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD CONSTRAINT "FK_eccda0cadce510597b466ca3a09" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

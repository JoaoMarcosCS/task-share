import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateListShareTable1754154386414 implements MigrationInterface {
    name = 'UpdateListShareTable1754154386414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list-share" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD "taskListIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD CONSTRAINT "FK_eccda0cadce510597b466ca3a09" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list-share" ADD CONSTRAINT "FK_dbf3537326ae15b377bc21ef655" FOREIGN KEY ("taskListIdId") REFERENCES "task-list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list-share" DROP CONSTRAINT "FK_dbf3537326ae15b377bc21ef655"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP CONSTRAINT "FK_eccda0cadce510597b466ca3a09"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP COLUMN "taskListIdId"`);
        await queryRunner.query(`ALTER TABLE "list-share" DROP COLUMN "userIdId"`);
    }

}

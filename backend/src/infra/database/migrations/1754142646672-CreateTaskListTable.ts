import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskListTable1754142646672 implements MigrationInterface {
    name = 'CreateTaskListTable1754142646672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task-list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_a7e7827bfc4cf45c62eabc30e3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task-list" ADD CONSTRAINT "FK_d9e7bd2c02231518dcd68fcd987" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task-list" DROP CONSTRAINT "FK_d9e7bd2c02231518dcd68fcd987"`);
        await queryRunner.query(`DROP TABLE "task-list"`);
    }

}

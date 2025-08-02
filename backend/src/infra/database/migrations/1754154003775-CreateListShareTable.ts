import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateListShareTable1754154003775 implements MigrationInterface {
    name = 'CreateListShareTable1754154003775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list-share"
             ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
             "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
              CONSTRAINT "PK_2a76734c15b7d34c82f30d7b0a0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "list-share"`);
    }

}

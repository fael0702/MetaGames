import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1701388013033 implements MigrationInterface {
    name = 'Base1701388013033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "id_facebook" character varying`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "UQ_37965d4163cf769bf74c1cd3b13" UNIQUE ("id_facebook")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "UQ_37965d4163cf769bf74c1cd3b13"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "id_facebook"`);
    }

}

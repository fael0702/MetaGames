import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1701175646910 implements MigrationInterface {
    name = 'Base1701175646910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "UQ_6c3fe73a09a3c114148bdf1b387"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "id_google"`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "id_google" character varying`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "UQ_6c3fe73a09a3c114148bdf1b387" UNIQUE ("id_google")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "UQ_6c3fe73a09a3c114148bdf1b387"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "id_google"`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD "id_google" bigint`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "UQ_6c3fe73a09a3c114148bdf1b387" UNIQUE ("id_google")`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1700916119123 implements MigrationInterface {
    name = 'Base1700916119123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "id_google" integer`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "senha" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "senha" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "id_google"`);
    }

}

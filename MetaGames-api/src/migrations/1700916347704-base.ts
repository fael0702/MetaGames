import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1700916347704 implements MigrationInterface {
    name = 'Base1700916347704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "data_nascimento" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "data_nascimento" SET NOT NULL`);
    }

}

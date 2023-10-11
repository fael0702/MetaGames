import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1697044702716 implements MigrationInterface {
    name = 'Base1697044702716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "data_nascimento" DATE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "data_nascimento"`);
    }

}

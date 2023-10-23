import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1697808188245 implements MigrationInterface {
    name = 'Base1697808188245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "imagem" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "imagem"`);
    }

}

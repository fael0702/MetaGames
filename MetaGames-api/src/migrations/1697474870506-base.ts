import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1697474870506 implements MigrationInterface {
    name = 'Base1697474870506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "background_image"`);
        await queryRunner.query(`ALTER TABLE "jogo" ADD "background_image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "data_nascimento" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "data_nascimento" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jogo" DROP COLUMN "background_image"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "background_image" character varying NOT NULL`);
    }

}

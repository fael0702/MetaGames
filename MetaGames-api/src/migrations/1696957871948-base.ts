import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1696957871948 implements MigrationInterface {
    name = 'Base1696957871948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" ADD "background_image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "background_image"`);
    }

}

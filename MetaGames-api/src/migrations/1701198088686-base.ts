import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1701198088686 implements MigrationInterface {
    name = 'Base1701198088686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" ADD "sentimento" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "sentimento"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1697477342299 implements MigrationInterface {
    name = 'Base1697477342299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_8fcfd169c00f54aa6593957b8e8"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "REL_8fcfd169c00f54aa6593957b8e"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_8fcfd169c00f54aa6593957b8e8" FOREIGN KEY ("jogo_id") REFERENCES "jogo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_8fcfd169c00f54aa6593957b8e8"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "REL_8fcfd169c00f54aa6593957b8e" UNIQUE ("jogo_id")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_8fcfd169c00f54aa6593957b8e8" FOREIGN KEY ("jogo_id") REFERENCES "jogo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

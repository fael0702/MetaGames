import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1696513882022 implements MigrationInterface {
    name = 'Base1696513882022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jogo" ("data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "nome" character varying NOT NULL, "data_lancamento" TIMESTAMP NOT NULL, CONSTRAINT "PK_1d153a091f56d317000f94bece6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "comentario" character varying NOT NULL, "nota" numeric(5,1) NOT NULL, "usuario_id" integer, "jogo_id" integer, CONSTRAINT "REL_8fcfd169c00f54aa6593957b8e" UNIQUE ("jogo_id"), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_13a1089ecaf9ccbcbc6b2a91644" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_8fcfd169c00f54aa6593957b8e8" FOREIGN KEY ("jogo_id") REFERENCES "jogo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_8fcfd169c00f54aa6593957b8e8"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_13a1089ecaf9ccbcbc6b2a91644"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "jogo"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1698758565473 implements MigrationInterface {
    name = 'Base1698758565473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_invalido" ("id" SERIAL NOT NULL, "data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "exp" integer NOT NULL, "usuario_id" integer, CONSTRAINT "PK_0798dc320722f096ddf2764b91e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "token_invalido" ADD CONSTRAINT "FK_5e47c26c6e5da96b3ffb30e9b22" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token_invalido" DROP CONSTRAINT "FK_5e47c26c6e5da96b3ffb30e9b22"`);
        await queryRunner.query(`DROP TABLE "token_invalido"`);
    }

}

import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AccMigr1715057476896 {
    name = 'AccMigr1715057476896'

    async up(queryRunner) {
        
        await queryRunner.query(`
            CREATE TABLE "account" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_414d4052f22837655ff312168cb" UNIQUE ("name"),
                CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")
            )
        `);
        }
}

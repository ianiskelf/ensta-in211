import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class MonNomDeMigration1712050730537 {
    name = 'MonNomDeMigration1712050730537'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movies" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "date" character varying NOT NULL,
                CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movies"
        `);
    }
}

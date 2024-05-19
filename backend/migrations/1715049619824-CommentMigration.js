import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class CommentMigration1715049619824 {
    name = 'CommentMigration1715049619824'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" character varying NOT NULL,
                "movie" character varying NOT NULL,
                "author" character varying NOT NULL,
                "date" character varying NOT NULL,
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
    }
}

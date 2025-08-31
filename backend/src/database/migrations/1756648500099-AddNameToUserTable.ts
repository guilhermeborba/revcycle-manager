import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameToUserTable1756648500099 implements MigrationInterface {
    name = 'AddNameToUserTable1756648500099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" ADD "name" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    }

}

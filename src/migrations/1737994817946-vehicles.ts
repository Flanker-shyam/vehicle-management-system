import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicles1737994817946 implements MigrationInterface {
    name = 'Vehicles1737994817946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME COLUMN "status" TO "comments"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" RENAME COLUMN "comments" TO "status"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicle1737831844591 implements MigrationInterface {
    name = 'Vehicle1737831844591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "updatedAt"`);
    }

}

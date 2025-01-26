import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicles1737890566025 implements MigrationInterface {
    name = 'Vehicles1737890566025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "assigned_vehicle" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "assigned_vehicle" SET NOT NULL`);
    }

}

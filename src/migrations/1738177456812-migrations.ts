import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738177456812 implements MigrationInterface {
    name = 'Migrations1738177456812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "assigned_driver"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "assigned_driver" text`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "assigned_vehicle"`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "assigned_vehicle" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "assigned_vehicle"`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "assigned_vehicle" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "assigned_driver"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "assigned_driver" integer`);
    }

}

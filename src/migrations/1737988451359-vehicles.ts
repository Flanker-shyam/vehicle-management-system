import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicles1737988451359 implements MigrationInterface {
    name = 'Vehicles1737988451359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "spare_part_requested"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "spare_part_requested" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "spare_part_requested"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "spare_part_requested" text NOT NULL`);
    }

}

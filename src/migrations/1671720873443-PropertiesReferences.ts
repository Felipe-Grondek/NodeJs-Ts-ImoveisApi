import { MigrationInterface, QueryRunner } from "typeorm";

export class PropertiesReferences1671720873443 implements MigrationInterface {
    name = 'PropertiesReferences1671720873443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_7f69133de2f8701308b5988900c"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addresesId" TO "addressId"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_2b2211958ef1f0e3c680339100e" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "properties" RENAME COLUMN "addressId" TO "addresesId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_7f69133de2f8701308b5988900c" FOREIGN KEY ("addresesId") REFERENCES "addreses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

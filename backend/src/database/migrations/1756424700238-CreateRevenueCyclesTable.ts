import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRevenueCyclesTable1756424700238
  implements MigrationInterface
{
  name = 'CreateRevenueCyclesTable1756424700238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."revenue_cycles_stage_enum" AS ENUM('PRE_AUTH', 'ATTENDANCE', 'BILLING', 'ADJUDICATION', 'PAYMENT')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."revenue_cycles_claimstatus_enum" AS ENUM('OPEN', 'DENIED', 'APPROVED', 'PAID', 'CANCELLED')
        `);

    await queryRunner.query(`
            CREATE TABLE "revenue_cycles" (
                "id" SERIAL NOT NULL,
                "patientId" character varying NOT NULL,
                "payer" character varying NOT NULL,
                "procedureCode" character varying NOT NULL,
                "amount" numeric(10, 2) NOT NULL,
                "stage" "public"."revenue_cycles_stage_enum" NOT NULL,
                "claimStatus" "public"."revenue_cycles_claimstatus_enum" NOT NULL,
                "dueDate" date NOT NULL,
                "paidDate" date,
                "notes" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_revenue_cycles_id" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "revenue_cycles"`);

    await queryRunner.query(
      `DROP TYPE "public"."revenue_cycles_claimstatus_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."revenue_cycles_stage_enum"`);
  }
}

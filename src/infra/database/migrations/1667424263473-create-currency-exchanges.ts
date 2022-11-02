import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCurrencyExchanges1667424263473 implements MigrationInterface {
  private readonly table = "currency_exchanges";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "currency",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "conversion_rate",
            type: "decimal",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}

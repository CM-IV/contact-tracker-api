import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contacts extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable(this.tableName, (table) => {

      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'));
      table.string('first_name', 80).notNullable();
      table.string('last_name', 80).notNullable();
      table.string('phone_number', 80).notNullable().unique();
      table.string('work_place', 80).notNullable();
      table.string('notes', 150).notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamp('created_at', { useTz: true })
       table.timestamp('updated_at', { useTz: true })

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.event, (table) => {
      table.uuid("id").primary();
      table.string("soort", 255).notNullable();
      table.double("trainer").notNullable();
      table.double("datum").notNullable();
      table.double("startuur").notNullable();
      table.double("einduur").notNullable();
      table.double("notities").notNullable();
      table.unique("id", "idx_event_id_unique");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.event);
  },
};

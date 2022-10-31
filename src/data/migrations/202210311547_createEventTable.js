const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.event, (table) => {
      table.uuid("id").primary();
      table.string("soort", 255).notNullable();
      table.string("trainer", 255).notNullable();
      table.string("datum", 255).notNullable();
      table.string("startuur", 255).notNullable();
      table.string("einduur", 255).notNullable();
      table.string("notities", 255).notNullable();
      table.unique("id", "idx_event_id_unique");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.event);
  },
};

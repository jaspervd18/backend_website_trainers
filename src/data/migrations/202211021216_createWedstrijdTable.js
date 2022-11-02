const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.wedstrijd, (table) => {
      table.uuid("id").primary();
      table.string("datum", 255).notNullable();
      table.string("dag", 255).notNullable();
      table.string("naam", 255).notNullable();
      table.string("locatie", 255).notNullable();
      table.string("trainer", 255).nullable();
      table.string("functie", 255).nullable();
      table.string("notities", 255).nullable();
      table.unique("id", "idx_event_id_unique");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.wedstrijd);
  },
};

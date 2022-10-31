const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.alterTable(tables.order, (table) => {
      table.jsonb("adres").notNullable();

      table.dateTime("datum").notNullable();
    });
  },

  down: async (knex) => {
    await knex.schema.alterTable(tables.order, (table) => {
      table.dropColumns("adres", "datum");
    });
  },
};

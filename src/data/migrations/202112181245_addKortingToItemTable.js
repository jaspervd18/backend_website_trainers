const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.alterTable(tables.item, (table) => {
      table.double("korting").notNullable();
    });
  },

  down: async (knex) => {
    await knex.schema.alterTable(tables.item, (table) => {
      table.dropColumn("korting");
    });
  },
};

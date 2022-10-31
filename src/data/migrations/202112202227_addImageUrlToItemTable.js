const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.alterTable(tables.item, (table) => {
      table.string("image_url");
    });
  },

  down: async (knex) => {
    await knex.schema.alterTable(tables.item, (table) => {
      table.dropColumn("image_url");
    });
  },
};

const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.item, (table) => {
      table.uuid("id").primary();

      table.string("name", 255).notNullable();

      table.double("price").notNullable();

      table.unique("name", "idx_item_name_unique");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.item);
  },
};

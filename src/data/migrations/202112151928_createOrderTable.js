const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order, (table) => {
      table.uuid("id").primary();

      table.jsonb("items").notNullable();

      table.double("totaalprijs").notNullable();

      table
        .uuid("user_id")
        .notNullable()
        .references("id")
        .inTable(tables.user)
        .onDelete("CASCADE");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.order);
  },
};

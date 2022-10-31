const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.alterTable(tables.user, (table) => {
      table.string("name", 255).notNullable();

      table.string("password_hash").notNullable();

      table.jsonb("roles").notNullable();

      table.unique("name", "idx_user_name_unique");
    });
  },
  down: async (knex) => {
    await knex.schema.alterTable(tables.user, (table) => {
      table.dropColumns("name", "password_hash", "roles");
    });
  },
};

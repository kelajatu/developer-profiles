
exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function(table) {
    table.increments();
    table
      .string("projtitle", 1000)
      .notNullable();
    table
      .string("link", 1000);
    table
      .string("projdescription", 1000);
    table
      .string("projimg", 1000);
    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable("places", function(table) {
  table.increments();
  table
    .string("place");
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
  return knex.schema.dropTableIfExists("places");
};

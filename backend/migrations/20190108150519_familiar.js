
exports.up = function(knex, Promise) {
  return knex.schema.createTable("familiar", function(table) {
    table.increments();
    table
      .string("familiar");
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
  return knex.schema.dropTableIfExists("familiar");
};

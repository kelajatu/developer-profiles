
exports.up = function(knex, Promise) {
  return knex.schema.createTable("familiar", function(table) {
    table.increments();
    table
      .string("familiar");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("familiar");
};

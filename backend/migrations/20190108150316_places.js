
exports.up = function(knex, Promise) {
  return knex.schema.createTable("places", function(table) {
  table.increments();
  table
    .string("place");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("places");
};

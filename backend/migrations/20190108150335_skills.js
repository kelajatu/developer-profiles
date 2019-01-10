
exports.up = function(knex, Promise) {
  return knex.schema.createTable("skills", function(table) {
    table.increments();
    table
      .string("skill")
      .unique("email");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("skills");
};

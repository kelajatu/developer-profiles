
exports.up = function(knex, Promise) {
  return knex.schema.createTable("skills", function(table) {
    table.increments();
    table
      .string("skill");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("skills");
};

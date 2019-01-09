
exports.up = function(knex, Promise) {
  return knex.schema.createTable("topskills", function(table) {
    table.increments();
    table
      .string("topskill");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("topskills");
};

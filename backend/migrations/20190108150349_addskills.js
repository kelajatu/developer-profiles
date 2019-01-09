
exports.up = function(knex, Promise) {
  return knex.schema.createTable("addskills", function(table) {
    table.increments();
    table
      .string("addskill");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("addskills");
};

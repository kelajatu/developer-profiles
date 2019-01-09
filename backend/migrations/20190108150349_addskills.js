
exports.up = function(knex, Promise) {
  return knex.schema.createTable("addskills", function(table) {
    table.increments();
    table
      .string("addskill");
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
  return knex.schema.dropTableIfExists("addskills");
};

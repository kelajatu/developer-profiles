
exports.up = function(knex, Promise) {
  return knex.schema.createTable("topskills", function(table) {
    table.increments();
    table
      .string("topskill");
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
  return knex.schema.dropTableIfExists("topskills");
};

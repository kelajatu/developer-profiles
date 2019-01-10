
exports.up = function(knex, Promise) {
  return knex.schema.createTable("education", function(table) {
    table.increments();
    table
      .string("school")
        .notNullable();
    table
      .string("schooldates");
    table
      .string("degree");
    table
      .string("course");
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
  return knex.schema.dropTableIfExists("education");
};

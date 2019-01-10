exports.up = function(knex, Promise) {
  return knex.schema.createTable("experience", function(table) {
    table.increments();
    table
      .string("jobtitle")
      .notNullable();
    table
      .string("jobdates");
    table
      .string("jobdescription");
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
  return knex.schema.dropTableIfExists("experience");
};

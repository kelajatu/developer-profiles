exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table
      .string("email")
      .notNullable()
      .unique("email");
    table
      .string("firstname")
      .notNullable();
    table
      .string("lastname")
      .notNullable();
    table
      .string("title")
    table
      .string("filter")
    table
      .string("location")
    table
      .string("github")
    table
      .string("linkedin")
    table
      .string("portfolio")
    table
      .string("badge")
    table
      .string("places")
    table
      .string("summary")
    table
      .string("topskills")
    table
      .string("additionalskills")
    table
      .string("familiar")
    table
      .string("projects")
    table
      .string("experience")
    table
      .string("education")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

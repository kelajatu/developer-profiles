exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table
      .string("email", 1000)
      .notNullable()
      .unique("email");
    table
      .string("firstname", 1000)
      .notNullable();
    table
      .string("lastname", 1000)
      .notNullable();
    table
      .string("image", 1000);
    table
      .string("title", 1000);
    table
      .string("filter");
    table
      .string("location", 1000);
    table
      .string("github");
    table
      .string("linkedin");
    table
      .string("portfolio");
    table
      .string("badge");
    table
      .string("summary", 1000);
    table
      .string("access_token");
    table
      .string("places", 1000);
    table
      .string("topskills", 1000);
    table
      .string("addskills", 1000);
    table
      .string("familiar", 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

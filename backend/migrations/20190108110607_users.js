exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("email", 1000)
      .unique("email");
    table.string("first_name", 1000)
    table.string("last_name", 1000)
    table.string("image", 1000);
    table.string("title", 1000);
    table.string("filter");
    table.string("location", 1000);
    table.string("github");
    table.string("linkedin");
    table.string("portfolio");
    table.string("badge");
    table.string("summary", 1000);
    table.string("access_token");
    table.string("places", 1000);
    table.string("top_skills", 1000);
    table.string("add_skills", 1000);
    table.string("familiar", 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

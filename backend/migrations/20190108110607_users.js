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

    /*
    
    table.string("job_field")
    table.string("current_location_name", 1000);
    table.string("current_location_lat", 1000);
    table.string("current_location_lon", 1000);
    table.string("interested_location_names", 1000);
    table.string("public_email", 1000);
    
    */

    table.string("location", 1000);
    table.string("location_id", 1000);
    table.string("potential_location_ids", 1000);
    table.string("potential_location_names", 1000);

    table.string("github");
    table.string("linkedin");
    table.string("portfolio");
    table.string("badge");
    table.string("summary", 1000);

    table.string("access_token");
    table.string("places_id", 1000);

    table.string("top_skills", 1000);
    table.string("add_skills", 1000);
    table.string("familiar", 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

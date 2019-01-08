const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

module.exports = {
  getUsers: function(id) {
    if (id) {
      return db("users")
        .where("id", id);
    }
    //excludes summary ...
    return db("users")
      .select(
        "firstname", 
        "location", 
        "summary", 
        "title",
        "badge",
        "github",
        "linkedin",
        "portfolio",
        "topskills",
        "additionalskills",
        "familiar",
        "filter"
      )
  }
  addUser: function() {
    
  }
}
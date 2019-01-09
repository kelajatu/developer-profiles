const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

module.exports = {
  getUsers: function(id) {
    if (id) {
      return db("users")
        .where({id: id});
    }
    //excludes projects, experience, education for card view
    return db("users")
      .select(
        "firstname", 
        "lastname",
        "email",
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
  },
  addUser: function(user) {
    console.log(user)
    return db("users")
      .insert(user)
  },
  editUser: function(id, input) {
    return db("users")
      .where({id: id})
      .update(input)
  },
  deleteUser: function(id) {
    return db("users")
      .where({id: id})
      .delete()
  }
}
const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

module.exports = {
    getUsers: function(id) {
        //if id: return all information on user for focused profile page
        if (id) {
          return db("users")
            .where({id: id});
        }
    
        //if all users: excludes projects, experience, education for card view
        return db("users")
          .select(
            "id",
            "first_name", 
            "last_name",
            "email",
            "location", 
            "summary", 
            "title",
            "badge",
            "github",
            "linkedin",
            "portfolio",
            "top_skills",
            "add_skills",
            "familiar",
            "filter"
          )
      },
    
    //grabs set of IDs from user skills/places column
    getUserPlaceSkillID: function(id, type) {
        return db("users")
            .where({id: id})
            .select(`${type}`)
            .first();
    },

    // ==== add functions ====
    addUser: function(user) {
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
    },
}
const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

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
            "addskills",
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

    editUserInfo: function(id, input) {
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
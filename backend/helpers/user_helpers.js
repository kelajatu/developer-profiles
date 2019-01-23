const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

module.exports = {
    getUsers: function(email) {
        //if id: return all information on user for focused profile page
        if (email) {
            return db("users")
                .where({email: email}).first();
        }
    
        //if all users: excludes projects, experience, education for card view
        return db("users")
            .select(
                "id",
                "first_name", 
                "last_name",
                "email",
                "location", 
                "location_id",
                "potential_location_ids",
                "potential_location_names",
                "summary", 
                "title",
                "badge",
                "github",
                "linkedin",
                "portfolio",
                "top_skills",
                "add_skills",
                "familiar",
                "filter",
                "image"
            )
      },
    
    //grabs set of IDs from user skills/places column
    getUserSkillID: function(id, type) {
        return db("users")
            .where({id: id})
            .select(`${type}`)
            .first();
    },

    // ==== add functions ====
    addUser: function(user) {
      return db("users")
        .insert(user, ['id', 'email', 'first_name', 'last_name'])
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
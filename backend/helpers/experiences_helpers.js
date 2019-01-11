const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

module.exports = {
    //TODO
    addExperience: function(id) {
        return db("experience")
            .insert({userId: id})
    },
    //TODO
    editExperience: function(id, input) {

    },
}
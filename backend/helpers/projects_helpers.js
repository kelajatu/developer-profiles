const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

module.exports = {
    //TODO
    addProjects: function(id) {
        return db("projects")
            .insert({userId: id})
    },
    //TODO
    editProjects: function(id, input) {

    },
}
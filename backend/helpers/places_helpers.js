const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

module.exports = {
    //TODO
    addPlace: function(id) {
        return db("users")
            .insert()
    },
}
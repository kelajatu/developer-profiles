const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

module.exports = {
    //TODO
    addEducation: function(id) {
        return db("education")
            .insert({userId: id})
    },
    //TODO
    editEducation: function(id, input) {

    },
}
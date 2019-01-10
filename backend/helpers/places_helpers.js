const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

module.exports = {
    //TODO
    addPlace: function(id) {
      return db("users")
        .insert()
    },
}
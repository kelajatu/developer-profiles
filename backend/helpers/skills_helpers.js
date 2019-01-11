const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig[process.env.DB])

module.exports = {
    //gets word bank of skills
    getAllSkills: function(){
        return db("skills")
    },
}
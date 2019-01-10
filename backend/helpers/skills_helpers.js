const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

module.exports = {
    //gets word bank of skills
    getAllSkills: function(){
        return db("skills")
    },
}
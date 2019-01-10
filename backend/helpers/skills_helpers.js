const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

module.exports = {
    //gets word bank of skills
    getAllSkills: function(){
        return db("skills")
    },

  // addMoreskills: function(id, skillsArr) {
  //   return db("users")
  //   .where({id: id})
  //   .update({addskills: skillsArr})
  // },

  // createAddSkill: function() {

  // },
}
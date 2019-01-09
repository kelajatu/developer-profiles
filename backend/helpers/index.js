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
        "additionalskills",
        "familiar",
        "filter"
      )
  },

  getPlacesAndSkills: function(id, type) {
    return  db("users")
      .where({id: id})
      .select(`${type}`)
      .first();
  },

  modifyArr: async function(id, type){
      let skills_places = await this.getPlacesAndSkills(id, type)
          let skills_places2 = [];
          skills_places = skills_places.topskills.split(",");
          skills_places = skills_places.map(string => Number(string))
          console.log('skills_places45:', skills_places)
          return db('topskills').whereIn('id', skills_places)
          // skills_places.forEach(id => {
          //     skills_places2.push(db(`${type}`).where({id: id}))

          // })
  },
  
  getAllSkills: function(){
      return db('topskills')
  },

  // ==== add functions ====
  addUser: function(user) {
    return db("users")
      .insert(user)
  },
  // addPlace: function(id) {
  //   return db("users")
  //   .insert({userId: id})
  // },
  addTopskill: function(id) {
    return db("users")
    .insert({userId: id})
  },
  addMoreskills: function(id) {
    return db("addskills")
    .insert({userId: id})
  },
  addExperience: function(id) {
    return db("experience")
    .insert({userId: id})
  },
  addEducation: function(id) {
    return db("education")
    .insert({userId: id})
  },
  addProjects: function(id) {
    return db("projects")
    .insert({userId: id})
  },
  addFamiliar: function(id) {
    return db("familiar")
    .insert({userId: id})
  },

  // ==== edit functions ====

  editUserInfo: function(id, input) {
    return db("users")
      .where({id: id})
      .update(input)
  },
  editExperience: function(id, input) {

  },
  editEducation: function(id, input) {

  },
  editProjects: function(id, input) {

  },
  deleteUser: function(id) {
    return db("users")
      .where({id: id})
      .delete()
  }
}
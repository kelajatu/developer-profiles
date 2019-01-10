const knex = require("knex");
const dbconfig = require("../knexfile");
const db = knex(dbconfig.development);

const user_helpers = require('./user_helpers')
const skills_helpers = require('./skills_helpers')
const places_helpers = require('./places_helpers')
const experience_helpers = require('./experiences_helpers')
const projects_helpers = require('./projects_helpers')
const education_helpers = require('./education_helpers')

module.exports = {
    user_helpers,
    skills_helpers,
    places_helpers,
    experience_helpers,
    projects_helpers,
    education_helpers,

  //uses array of IDs from user skills/places column and grabs the 
  //skills/places associated with those IDs in a batch
  getUserPlacesOrSkills: async function(id, type){
    let parent;
    if (type == "places") {
      parent = "places"
    } else {
      parent = "skills"
    }
    let skills_places = await user_helpers.getUserPlaceSkillID(id, type)
    skills_places = skills_places[type].split(",");
    skills_places = skills_places.map(string => Number(string))
    return db(`${parent}`).whereIn('id', skills_places)
  },

  addKeywords: function(id, type, keywordsArr) {
    return db("users")
      .where({id: id})
      .update({[type]: keywordsArr})
  },

  createKeywords: function(type, keyword) {
    let parent;
    if (type == "places") {
      parent = "places"
    } else {
      parent = "skills"
    }
    return db(`${parent}`)
      .insert(keyword)
  },
  
  // addFamiliar: function(id, skillsArr) {
  //   return db("users")
  //   .where({id: id})
  //   .update({familiar: skillsArr})
  // },

  // createFamiliar: function() {

  // },
}
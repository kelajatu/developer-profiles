const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

server.get('/', (req, res) => {
    db.getUsers().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.log("there is an error in GET users/", err)
        res.status(500).json({message: "there is an error in GET users/", err: err})
    })
})

//get skills or places, define in path as "type" either skills or places
server.get('/skills/:id/:type', (req, res) => {
    db.getUserPlacesOrSkills(req.params.id, req.params.type).then(skills => {
        res.status(200).json(skills)
    }).catch(err => {
        console.log("there is an error in users/skills/:id/:type", err)
        res.status(500).json({message: "there is an error in users/skills/:id/:type", err: err})
    })
})

//add a skill to the skill bank
server.post('/addkeys/:userid/:type', (req, res) => {
    db.createKeywords(req.params.type, req.body).then(async function(data) {
        let oldKeys = await db.user_helpers.getUserPlaceSkillID(req.params.userid, req.params.type);
        oldKeys = oldKeys[req.params.type] + `,${data}`
        db.addKeywords(req.params.userid, req.params.type, oldKeys).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log("there is an error in users/addtopskill/:id/:type at addTopSkill", err)
            res.status(500).json({message: "there is an error in users/addtopskill/:id/:type at addTopSkill", err: err})
        })
    }).catch(err => {
        console.log("there is an error in users/addtopskill/:id/:type at createTopSkill", err)
        res.status(500).json({message: "there is an error in users/addtopskill/:id/:type at createTopSkill", err: err})
    })
})

server.get('/:id', (req, res) => {
    db.getUsers(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log("error fetching data at GET users/:id", err)
      res.status(500).json({ message: "error fetching data at GET users/:id", err: err });
    })    
})

server.post('/new', (req, res) => {
  db.addUser(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log("error posting data at POST users/new", err)
    res.status(500).json({ message: "error posting data at POST users/new", err: err });
  })    
})

module.exports = server
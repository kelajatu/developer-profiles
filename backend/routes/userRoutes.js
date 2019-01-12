const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

//get all users for card view
server.get('/', (req, res) => {
    db.user_helpers.getUsers().then(users => {
        console.log(users)
        res.status(200).json(users)
    }).catch(err => {
        console.log("there is an error in GET users/", err)
        res.status(500).json({message: "there is an error in GET users/", err: err})
    })
})

//get specific user for user profile
server.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.user_helpers.getUsers(req.params.id)
    .then(user => {
        console.log(user)
      res.status(200).json(user)
    })
    .catch(err => {
      console.log("error fetching data at GET users/:id", err)
      res.status(500).json({ message: "error fetching data at GET users/:id", err: err });
    })    
})

//add user
//expects req.body with email, first_name, last_name at minimum
//email must be unique in database
//empty values will fill with null
server.post('/new', (req, res) => {
    db.user_helpers.addUser(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log("error posting data at POST users/new", err)
      res.status(500).json({ message: "error posting data at POST users/new", err: err });
    })    
  })

server.put('/:id', (req, res) => {
    db.user_helpers.editUser(req.params.id, req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: "error editing user data", err: err})
    })
})

server.delete('/:id', (req, res) => {
    db.user_helpers.deleteUser(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: "error deleting user", err: err})
    })
})


//get skills or places
//expects type in path param as either "top_skills" "add_skills" "familiar" or "places"
server.get('/skills/:id/:type', (req, res) => {
    db.getUserPlacesOrSkills(req.params.id, req.params.type).then(skills => {
        res.status(200).json(skills)
    }).catch(err => {
        console.log("there is an error in users/skills/:id/:type", err)
        res.status(500).json({message: "there is an error in users/skills/:id/:type", err: err})
    })
})

//add a skill/place *from* the skill bank
//expects user id and skill type in path params
//expects skill/place id in req.body ex."id":"1"
server.post('/addkeys/:userid/:type', (req, res) => {
    db.user_helpers.getUserPlaceSkillID(req.params.userid, req.params.type).then(oldKeysList => {
        let oldKeys = oldKeysList[req.params.type] + `,${req.body['id']}`
    db.addKeywords(req.params.userid, req.params.type, oldKeys).then(data => {
        res.status(200).json(data)
    })}).catch(err => {
        console.log("error adding from key bank", err)
        res.status(500).json({message: "error adding from key bank", err: err})
    })
})

//add a completely new skill/place to the skill bank
//expects user id and skill type in path params
//expects skill name in req.body ex. "skill": "Python" or "place":"Washington, D.C."
server.post('/createkeys/:userid/:type', (req, res) => {
    db.createKeywords(req.params.type, req.body).then(async function(data) {
        let oldKeys = await db.user_helpers.getUserPlaceSkillID(req.params.userid, req.params.type);
        oldKeys = oldKeys[req.params.type] + `,${data}`
        db.addKeywords(req.params.userid, req.params.type, oldKeys).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log("there is an error in users/addKey/:id/:type at addKey", err)
            res.status(500).json({message: "there is an error in users/addKey/:id/:type at addKey", err: err})
        })
    }).catch(err => {
        console.log("there is an error in users/addKey/:id/:type at createKey", err)
        res.status(500).json({message: "there is an error in users/addKey/:id/:type at createKey", err: err})
    })
})

//gets projects, experience, or education 
//expects one of the above terms in place of "extras" in path param. ex. '/:userid/education'
server.get('/:userid/:extras', (req, res) => {
    db.getExtras(req.params.userid, req.params.extras)
    .then(extras => {
        res.status(200).json(extras)
    })
    .catch(err => {
        res.status(500).json({message: "error fetching data", err: err})
    })
})

//TODO 
//post/put/delete for extras
//add project, experience, or education
//req.body expectations for project: "userId", "project_title", "project_description"
//"link", "projimg" 
//for experience: "userId", "jobtitle", "jobdescription", "jobdates"
//for education: "userId", "school", "school_dates", "degree", "course"
//only userId and title/school are required for a post
server.post('/:userid/:extras', (req, res) => {
    console.log(req.params.extras)
    db.addExtra(req.params.extras, req.body)
    .then(extra => {
        res.status(200).json(extra)
    })
    .catch(err => {
        res.status(500).json({message: "error adding extras data", err: err})
    })
})
//edit project/experience/education
//expects project/experience/education ID as param extrasID
//expects edited fields in req.body
server.put('/:userid/:extras/:extrasID', (req, res) => {
    db.editExtra(req.params.extrasID, req.params.extras, req.body)
    .then(extra => {
        res.status(200).json(extra)
    })
    .catch(err => {
        res.status(500).json({message: "error editing extras data", err: err})
    })
})

server.delete('/:userid/:extras/:extrasID', (req, res) => {
    db.deleteExtra(req.params.extrasID, req.params.extras)
    .then(extra => {
        res.status(200).json(extra)
    })
    .catch(err => {
        res.status(500).json({message: "error deleting extras data", err: err})
    })
})

module.exports = server
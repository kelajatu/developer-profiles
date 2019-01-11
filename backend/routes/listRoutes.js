const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

server.get('/skills', (req, res) => {
    db.skills_helpers.getAllSkills().then(skillsArr => {
        res.status(200).json(skillsArr)
    }).catch(err => {
        console.log("Error at GET list/skills.", err)
        res.status(500).json({message: 'Error at GET list/skills.', err: err})
    })
})

module.exports = server
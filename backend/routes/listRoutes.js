const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

server.get('/topskills', (req, res) => {
    db.getAllSkills().then(skillsArr => {
        res.status(200).json(skillsArr)
    }).catch(err => {
        console.log("Error at GET list/topskills.", err)
        res.status(500).json({message: 'Error at GET list/topskills.', err: err})
    })
})

module.exports = server
const express = require('express')
const server = express.Router()
const db = require('../helpers/index.js')

server.get('/topskills', (req, res) => {
    db.getAllSkills().then(skillsArr => {
        res.status(200).json(skillsArr)
    }).catch(err => {
        console.log(err)
        res.status(500).json({message: 'Error a getAllSkills in listRoutes.', err: err})
    })
})

module.exports = server
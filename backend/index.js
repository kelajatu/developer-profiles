const express = require('express')

const server = express()
require('dotenv').config()

const db = require('./helpers/index.js')

server.use(express.json())

const PORT = process.env.PORT || 3000

server.get('/api', (req, res) => {
    res.send('NICE. The api is up and running.')
})

server.get('/users', (req, res) => {
    db.getUsers().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.log(err)
    })
})

server.get('/register', (req, res) => {
    res.send('registration endpoint')
})

server.get('/login', (req, res) => {
    res.send('login endpoint')
})

server.get('/user/:id', (req, res) => {
    //getUser(req.params.id)
    const { id } = req.params
    res.status(200).json({single_user_endpoint: id})
})

server.listen(PORT, () => console.log(`\n ==  server is running on ${PORT} == \n`))
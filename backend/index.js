const express = require('express')
const routes = require('./routes/routes.js')
const server = express()
require('dotenv').config()

server.use(express.json())

const PORT = process.env.PORT || 3000

server.get('/', (req, res) => {
    res.send('NICE. The api is up and running.')
})

server.use('/', routes)

server.listen(PORT, () => {
    console.log("process.env", process.env)
    console.log(`\n ==  server is running on ${PORT} == \n`)
})
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
    console.log(`\n ==  server is running on ${PORT} == \n`)
    // console.log("process.env.RDS_USERNAME", process.env.RDS_USERNAME)
})
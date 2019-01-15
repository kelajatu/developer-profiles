const express = require('express')
const routes = require('./routes/routes.js')
const server = express()
require('dotenv').config()

server.use(express.json())

let PORT = process.env.PORT
if (PORT == null || PORT == ""){
    PORT = 7000;
}

server.get('/', (req, res) => {
    res.send('NICE. The api is up and running.')
})

server.use('/', routes)

server.listen(PORT, () => {
    // console.log("process.env", process.env)
    console.log(`\n == server is running on ${PORT} == \n == using the ${process.env.NODE_ENV} database == \n`)
})
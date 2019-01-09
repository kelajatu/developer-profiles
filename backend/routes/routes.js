const express = require('express')

const router = express.Router()

const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')

router.use(express.json())

router.use('/users', userRoutes)
router.use('/auth', authRoutes)

module.exports = router
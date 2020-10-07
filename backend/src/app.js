const express = require('express')
const cors = require('cors')
const app = express()

//settings

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use('/api/travels', require('./routes/travels'))

module.exports = app
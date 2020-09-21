
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const manageRouter = require('./routes/manage')
app.use('/api',manageRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const config = require('./config')
const port = process.env.PORT || 3001
var cookies = require("cookie-parser");
var helmet = require('helmet')
app.use(helmet())
app.use(cookies());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const manageRouter = require('./routes/manage')
app.use('/api',manageRouter)
app.use('/app', require('./routes/app/index'))
app.set('jwt-secret', config.secret)
app.listen(port, () => console.log(`Listening on port ${port}`))
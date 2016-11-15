const express = require('express')
const bodyParser = require('body-parser')

const md5 = require('md5')

articleId=3;

status=0;

const app = express()
app.use(bodyParser.json())
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)
require('./src/auth')(app)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

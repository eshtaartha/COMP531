const express = require('express')
const bodyParser = require('body-parser')
//const cors = require('cors');
var cookieParser = require('cookie-parser');

const md5 = require('md5')


mongoose = require('mongoose') //require Mongoose

// Initialize the URL of heroku database
url = 'mongodb://heroku_gbfzfm7w:77658c4bakndafli90us4qo55s@ds143767.mlab.com:43767/heroku_gbfzfm7w'

// Find if MONGOLAB URI is initialized, if yes, use it
if (process.env.MONGOLAB_URI) 
{
  url = process.env.MONGOLAB_URI;
}

mongoose.connect(url) //connect to Mongoose




const enableCORS = (re, res, next) => 
{
	res.setHeader('Access-Control-Allow-Origin', 'http://studybuddy7.surge.sh');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(enableCORS);

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

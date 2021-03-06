const express = require('express')
const bodyParser = require('body-parser')
//const cors = require('cors');
var cookieParser = require('cookie-parser');


const md5 = require('md5')

mongoose = require('mongoose') //require Mongoose

// Initialize the URL of heroku database
url = 'mongodb://heroku_gbfzfm7w:77658c4bakndafli90us4qo55s@ds143767.mlab.com:43767/heroku_gbfzfm7w'

//url = 'mongodb://heroku_43d80g8j:fjge2u2qq7dvq94ktd4mgg41o5@ds139448.mlab.com:39448/heroku_43d80g8j'

// Find if MONGOLAB URI is initialized, if yes, use it
if (process.env.MONGOLAB_URI) 
{
  url = process.env.MONGOLAB_URI;
}

mongoose.connect(url) //connect to Mongoose

var request = require('request')
var qs = require('querystring')
var session = require('express-session')
passport = require('passport')
FacebookStrategy  = require('passport-facebook').Strategy;


const enableCORS = (re, res, next) => 
{
	
	res.setHeader('Access-Control-Allow-Origin', 'http://studybuddy8.surge.sh');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Custom-Header,X-Requested-With,Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())


app.use(enableCORS);

app.use(session({secret: 'thisIsMySecretMessage'}))
app.use(passport.initialize());
app.use(passport.session())

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


/////////////////Chat box code

//var chat = require('express')();
//var http = require('http').Server(chat);
var io = require('socket.io')(server);

require('./src/chatbox')(app)


io.on('connection', function(socket)
{
  console.log('A user connected');
  
  socket.on('studybuddychat',function(data)
    {
       io.sockets.emit('studybuddychat',{user:data.user,msg:data.msg});
    })

  
  socket.on('disconnect', function (data) 
  {
    io.sockets.emit('testCustomEvent',{user:data.user,text:data.text});
  });

});

/*http.listen(3001, function(){
  console.log('Chat server listening on port:3001');
});*/
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var passport = require('passport')

app = express()
app.use(session({secret : 'someweirdstringthatthebrowsercaresabout' }))
app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser());
var users = []



var config = {
	clientID : '1086176131500701',
	clientSecret :'3066c6343defbf368a33f6e2d8828401',
	callbackURL : 'http://localhost:3000/callback'
}



passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})


passport.deserializeUser(function(id , done) {
	var user = users[id]
	done(null, user)

})




passport.use(new FacebookStrategy(config, function(token, refreshToken, profile, done){
	process.nextTick(function() {
	return done(null, profile)
	})
})
)

function hello(req, res) {
	res.send('Hello World')
}

function fail(req,  res){
	res.send('Not Authenticated/Authorized')
}

function logout(req,  res){
	req.logout();
	res.redirect('/')
}

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

function profile(req, res) {
	res.send('Logged in successfully after third party authentication')
}




app.use('/auth/facebook', passport.authenticate('facebook', {scope : 'email'}))
app.use('/callback', passport.authenticate('facebook', {successRedirect : '/profile', failureRedirect : '/fail'}))
app.use('/profile', isLoggedIn, profile)
app.use('/fail', fail)
app.use('/logout', logout)
app.use('/', hello)

// Get the port from the environment, i.e., Heroku sets
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

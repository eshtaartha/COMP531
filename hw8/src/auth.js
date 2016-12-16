const md5 = require('md5')

cookieKey = 'key';



loggedInUser = "";
loggedInUserOauth = null;

var users=[];

var redis = require('redis').createClient("redis://h:pd82hf7vjmtr8i7l9nunpo0lap4@ec2-184-73-208-210.compute-1.amazonaws.com:10879")




/////////////////////User Schemas

var authSchema = new mongoose.Schema(
{
  rice: String,  
  facebook: String
})

var usersSchema = new mongoose.Schema(
{
    username: String,
    salt: String,
    hash: String,
    auth: [authSchema]
})

var followingSchema = new mongoose.Schema(
{
  author: String,  
  text: String
})

//////////////////// Profile Schemas
var profilesSchema = new mongoose.Schema(
{
    username: String,
    status: String,
    following: [followingSchema],
    email: String,
    zipcode: String,
    picture: String,
    dob: Date   
})


User = mongoose.model('User', usersSchema); // link the article schema to article object

Profile = mongoose.model('Profile', profilesSchema);


const registerUser = (req, res) =>
{
 var password = req.body.password;
 
 var salt = md5("This is the salt" + new Date().getTime() + req.body.username); //create unique salt

 var hash = md5(password + salt);

 var following = [{author:"eb29", text: "I need a break"}, {author:"sep1", text: "Web Dev rocks"} ];


 new User({ username: req.body.username, salt: salt, hash: hash}).save({},function (err, data) 
  {
      console.log("Save user data")
      console.log({data});

  })

 new Profile({ username: req.body.username, status: "Becoming a Web Developer", following: following, email: req.body.email, zipcode:req.body.zipcode, picture: "http://media.tumblr.com/tumblr_l1iotoYo541qbn8c7.jpg", dob: req.body.dob}).save({},function (err, data) 
  {

    if(err) throw err;

      console.log("Save profile data")
      console.log({data});

  })


 res.send({ result: 'success', username: req.body.username});

}


const loginUser = (req, res) =>
{
 

 loginUsername = req.body.username;
 loginPassword = req.body.password;

 

  findUser(loginUsername, function(data) 
  {     
    
    console.log(data);

    if(data)
    {
      if(loginUsername == data.username)
       {

        var verifyHash = md5(loginPassword + data.salt);

        
        
        if(verifyHash == data.hash)
         {
          console.log("Login successful")


          const sessionKey = md5('This is the secret message' + new Date().getTime() + data.username)

          

          redis.set(sessionKey,data.username); // set SID on REDIS



          status=1;

          loggedInUser = loginUsername;

          res.cookie(cookieKey,sessionKey,{maxAge:3600*1000,httpOnly:true}).send({ username:loginUsername, result: "success"});
          
         }
         else
         {
            
            res.sendStatus(401);
            
         }
       }
       else
       {
          res.sendStatus(401);
       }
     }
     else
     {
        res.sendStatus(401);
     }
   })

}


const registerLoginOAuth = (req, res) =>
{
 

}



const isLoggedIn = (req, res, next) =>
 {
   var sessionKey;
   var userObj= {}; 

   try
   { 

     if(req.cookies[cookieKey])
     {
      sessionKey= req.cookies[cookieKey];
      

        redis.get(req.cookies[cookieKey], function(err, val)
        {
          userObj = val;
          console.log(cookieKey+ ' mapped to ' + val);
          

          if(((!sessionKey)||(val != loggedInUser)))
           {
            console.log("No SID found")
            res.send(401);
           }

           else
           {
            console.log(sessionKey)
            next();
           }

        })
     }
     else
     {
        console.log("No SID found")
        res.send(401);
     }
   }catch(e)
   {
    console.log(e);
   }


 }


const logout = (req, res) =>
{
  console.log("OK")

  

  redis.del(req.cookies[cookieKey], function(err, reply) 
  {
    console.log("redis reply is")
    console.log(reply);
  });

  
  
  res.clearCookie(cookieKey).send(200);

  loggedInUser = ""
  loggedInUserOauth = null;

}


const hello = (req, res) =>
{
  
  res.send({"hello":"hello"});

}

const updatePassword = (req, res) =>
{

   var password = req.body.password;
 
   var salt = md5("This is the salt" + new Date().getTime() + req.body.username); //create unique salt

   var hash = md5(password + salt);

    findUserInUser(loggedInUser, res, function(user) 
    {   
        User.update({"_id":ObjectId(user._id)},{$set:{salt:salt, hash:hash}}, function (err, data)  
        {
            if(err) throw err;

            console.log("password updated");

            
            console.log(data)

            res.send({username: loggedInUser, status: "password changed"})

        });
         
                      
    })

}



/// Third party aunthentication functions
passport.use(new FacebookStrategy({
    clientID: 1086176131500701,
    clientSecret: '3066c6343defbf368a33f6e2d8828401',
    callbackURL: "http://studybuddy8.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) 
  {
    process.nextTick(function(){
      return done(null,profile)
    })
  }
));

passport.serializeUser(function(user,done)
{
  users[user.id] = user
  done(null,user.id)
})

passport.deserializeUser(function(id,done)
{
  var user = users[id]
  done(null,user)
})



const oauth = (req, res) => 
{
    console.log("Authentication successful");
    console.log({username:req.user.displayName, provider: req.user.provider})
    
    loggedInUserOauth = req.user.displayName;

    console.log("loggedInUserOauth is")
    console.log(loggedInUserOauth)

    res.redirect('http://studybuddy8.surge.sh');
   
}


const fbAuthStatus = (req, res) => 
{
    if(loggedInUserOauth)
    {
      findUserOauth(loggedInUserOauth, function(data) 
      {     
        
        console.log(data);

        if(data)
        {
             console.log("Login began with data")

             const sessionKey = md5('This is the secret message' + new Date().getTime() + loggedInUserOauth)

              redis.set(sessionKey,loggedInUserOauth); // set SID on REDIS

              res.cookie(cookieKey,sessionKey,{maxAge:3600*1000,httpOnly:true});

              loggedInUser = loggedInUserOauth; 

             
              res.send({ username:loggedInUserOauth, result: "success"})
           
         }
         else// First time OAUTH user
         {

             console.log(" New OAUTH user reg began")

             var password = "";
 
             var salt = "";

             var hash = "";

             var following = [{author:"eb29", text: "I need a break"}, {author:"sep1", text: "Web Dev rocks"} ];

             var auth = [{rice:null, facebook: loggedInUserOauth}];


             new User({ username: loggedInUserOauth, salt: salt, hash: hash, auth:auth}).save({},function (err, data) 
              {
                  console.log("Saved new OAUTH user data")
                  
                  console.log(loggedInUserOauth)
                  console.log(data.auth)

              })

             new Profile({ username: loggedInUserOauth, status: "Becoming a Web Developer", following: following, email: "abc@def.com", zipcode:"12345", picture: "http://media.tumblr.com/tumblr_l1iotoYo541qbn8c7.jpg", dob: req.body.dob}).save({},function (err, data) 
              {

                if(err) throw err;

                  console.log("Saved new OAUTH profile data")
                  

              })

             new Profile({ username: "eb29", status: "Becoming a Web Developer", following: following, email: "abc@def.com", zipcode:"12345", picture: "http://media.tumblr.com/tumblr_l1iotoYo541qbn8c7.jpg", dob: req.body.dob}).save({},function (err, data) 
              {

                if(err) throw err;

                  console.log("Saved new follower1 profile data")
                  

              })

             new Profile({ username: "sep1", status: "Becoming a Web Developer", following: following, email: "abc@def.com", zipcode:"12345", picture: "http://media.tumblr.com/tumblr_l1iotoYo541qbn8c7.jpg", dob: req.body.dob}).save({},function (err, data) 
              {

                if(err) throw err;

                  console.log("Saved newfollower2 profile data")
                 
              })

             var id = new Date().valueOf();

             new Article({ id: id, author: loggedInUserOauth, img: null, date: new Date().getTime(), text: "This is an example article"}).save({},function (err, articlesOrig) 
              {
                  var articles = [];
                  articles.push(articlesOrig);
                  console.log("Post artcile works")
                  

              })

             new Article({ id: id, author: "eb29", img: null, date: new Date().getTime(), text: "Welcome to Study Buddy"}).save({},function (err, articlesOrig) 
              {
                  var articles = [];
                  articles.push(articlesOrig);
                  console.log("Post artcile works")
                  

              })

             new Article({ id: id, author: "sep1", img: null, date: new Date().getTime(), text: "Welcome to Study Buddy"}).save({},function (err, articlesOrig) 
              {
                  var articles = [];
                  articles.push(articlesOrig);
                  console.log("Post artcile works")
                  

              })

             const sessionKey = md5('This is the secret message' + new Date().getTime() + loggedInUserOauth)

              redis.set(sessionKey,loggedInUserOauth); // set SID on REDIS

              res.cookie(cookieKey,sessionKey,{maxAge:3600*1000,httpOnly:true});

              loggedInUser = loggedInUserOauth; 

              res.send({ result: "success", username:loggedInUserOauth})
         }
       })

      
    }
    else
    {
      res.send({result:"fail"})
    }
   
}

function findUser(username, callback) 
{
  User.find({ "username": username }).exec(function(err, user) 
  {
    
    var index = (user.length>1)? user.length-1:0; 

    callback(user[index]);
    
  })
}

function findUserOauth(username, callback) 
{
  User.find({ auth: {$elemMatch: {facebook: username}}}).exec(function(err, user) 
  {
    if(err) throw err;

    

    var index = (user.length>1)? user.length-1:0;  //return the latest result
    
    console.log("returned OAUTH username is")
    console.log(user[index])

    callback(user[index]);
    
    
  })
}


const removeUser = (req, res) =>
{
  
  User.remove({ "username": "Eshtaartha Basu" }).exec(function(err, user) 
  {
    
    console.log("Trying to remove")
    
  });
  
  res.sendStatus(200);

}




function findUserInUser(username, res, callback) 
{
  User.find({ "username": username }).exec(function(err, user) 
  {
    

    var index = (user.length>1)? user.length-1:0;  //return the latest result
    
    

    if(user)
    {
      callback(user[index]);
    }
    else
     {
        res.sendStatus(401);
     }


    
    
  })
}


module.exports = app => 
{
   
     app.post('/register', registerUser)
     
     app.post('/login', loginUser)

     app.put('/logout',isLoggedIn, logout)

     app.put('/password',isLoggedIn, updatePassword)

     app.get('/',hello)

     app.get('/authFB', passport.authenticate('facebook'));

     
     app.get('/auth/facebook/callback',passport.authenticate('facebook'), oauth);

     app.get('/fbAuthStatus', fbAuthStatus)

     app.get('/remove', removeUser )
     
}


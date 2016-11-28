const md5 = require('md5')

cookieKey = 'key';

sessionUser = {};

loggedInUser = "";



/////////////////////User Schemas
var usersSchema = new mongoose.Schema(
{
    username: String,
    salt: String,
    hash: String
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

          sessionUser[sessionKey] = data; //save user object to sessionUser
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

const isLoggedIn = (req, res, next) =>
 {
   var sessionKey; 

   try
   { 

     if(req.cookies[cookieKey])
     {
      sessionKey= req.cookies[cookieKey];
      console.log("The Session Key is");
      console.log(sessionKey);
     }
   }catch(e)
   {
    console.log(e);
   }

   if(((!sessionKey)||(sessionUser[sessionKey].username != loginUsername)))
   {
    console.log("No SID found")
    res.send(401);
   }

   else
   {
    console.log(sessionKey)
    next();
   }


 }


const logout = (req, res) =>
{
  console.log("OK")
  delete sessionUser[req.cookies[cookieKey]];
  res.clearCookie(cookieKey).send(200);

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

function findUser(username, callback) 
{
  User.find({ "username": username }).exec(function(err, user) 
  {
    
    var index = (user.length>1)? user.length-1:0; 

    callback(user[index]);
    
  })
}

function removeUser(username, callback) 
{
  User.remove({ "username": username });
}



function findUserInUser(username, res, callback) 
{
  User.find({ "username": username }).exec(function(err, user) 
  {
    console.log(user);

    var index = (user.length>1)? user.length-1:0;  //return the latest result
    
    console.log(index)

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

     app.put('/password', isLoggedIn, updatePassword)

     app.get('/',hello)

     
}


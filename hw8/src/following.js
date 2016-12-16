ObjectId = require('mongodb').ObjectID;

var redis = require('redis').createClient("redis://h:pd82hf7vjmtr8i7l9nunpo0lap4@ec2-184-73-208-210.compute-1.amazonaws.com:10879")

const getFollowers = (req, res) =>
{
  console.log("Logged in user is")
  console.log(loggedInUser)

  if(req.params.user)
  {
      findUser(req.params.user, function(user) 
      {    
        var temp = [];

        if(user.following.length > 1)
        {
          console.log("temp executing")
          user.following.map((data)=>
          {
            temp.push(data.author);
          })

          res.send({username: loggedInUser, following: temp})

        }
        else
        {
          res.send({username: loggedInUser, following: [user.following.author]})
        }
        
                        
      })
  }
  else
  {
      findUser(loggedInUser, function(user) 
      {    
        console.log(user)
        
        var temp = [];

        if(user.following.length > 1)
        {
          console.log("temp executing")
          user.following.map((data)=>
          {
            temp.push(data.author);
          })

          res.send({username: loggedInUser, following: temp})

        }
        else
        {
          res.send({username: loggedInUser, following: [user.following.author]})
        }
                        
      })
  } 

  
}

const putFollowers = (req, res) =>
{
  var user = req.params.user;

  find_id(loggedInUser, function(id) 
  {    
      
    if(id)
    {
      Profile.update({"_id":ObjectId(id)},{$push:{following:{author: user, text: "This is my headline"}}}, function (err, data)  
      {
          if(err) throw err;

          console.log("Following is pushed");

          
          

          

      });


      findUser(loggedInUser, function(user) 
      {    
        var temp = [];

        if(user.following.length > 1)
        {
          console.log("temp executing")
          user.following.map((data)=>
          {
            temp.push(data.author);
          })

          res.send({username: loggedInUser, following: temp})

        }
        else
        {
          res.send({username: loggedInUser, following: [user.following.author]})
        }
        
                        
      })

    }
    else
    {
          res.sendStatus(401);
    }

  })
  
}

const deleteFollowers = (req, res) =>
{
  var user = req.params.user;

  find_id(loggedInUser, function(id) 
  {    
    
    
    if(id)
    {  
    
      Profile.update({"_id":ObjectId(id), "following.author":user},{$pull:{following:{author: user}}}, function (err, data)  
      {
          if(err) throw err;

          console.log("Following is deleted");

          
          

          

      });

      findUser(loggedInUser, function(user) 
      {    
        var temp = [];

        if(user.following.length > 1)
        {
          console.log("temp executing")
          user.following.map((data)=>
          {
            temp.push(data.author);
          })

          res.send({username: loggedInUser, following: temp})

        }
        else
        {
          res.send({username: loggedInUser, following: [user.following.author]})
        }
        
                        
      })
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
   }catch(e)
   {
    console.log(e);
   }

  
 }

function findUser(username, callback) 
{
  Profile.find({ "username": username }).exec(function(err, user) 
  {
    console.log(user);

    var index = (user.length>1)? user.length-1:0;  //return the latest result
    
    console.log(index)

    callback(user[index]);
    
  })
}


function find_id(username, callback) 
{
  Profile.find({ "username": username }).exec(function(err, user) 
  {
    

    var index = (user.length>1)? user.length-1:0;  //return the latest result
    
    console.log("returned id is")
    console.log(user[index]._id)

    callback(user[index]._id);
    
  })
}


module.exports = app => 
{

     app.get('/following/:user?',isLoggedIn, getFollowers)
     app.put('/following/:user',isLoggedIn, putFollowers)
     app.delete('/following/:user',isLoggedIn, deleteFollowers)
}

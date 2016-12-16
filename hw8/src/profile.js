
var redis = require('redis').createClient("redis://h:pd82hf7vjmtr8i7l9nunpo0lap4@ec2-184-73-208-210.compute-1.amazonaws.com:10879")

const multer = require('multer')
const stream = require('stream')
const cloudinary = require('cloudinary')

if (!process.env.CLOUDINARY_URL) {
     process.env.CLOUDINARY_URL="cloudinary://314865133542264:6ZcWHtf62vWBCINWsaF9bt0YICQ@helniuqep"
}

const doUpload = (publicName, req, res, next) => 
{

  const uploadStream = cloudinary.uploader.upload_stream(result => 
  {     
         
         req.fileurl = result.url
         req.fileid = result.public_id
         next()
  }, { public_id: req.body[publicName]})

  
  const s = new stream.PassThrough()
  s.end(req.file.buffer)
  s.pipe(uploadStream)
  s.on('end', uploadStream.end)
  
}


const uploadImage = (publicName) => (req, res, next) =>
     multer().single('image')(req, res, () => doUpload(publicName, req, res, next))



const getHeadline = (req, res) =>
{
  if(req.params.users)
  {
      var user = req.params.users.split(',')

      if(user.length>1)
      {
        var headlines = [];

        console.log("User is")
        console.log(user)

        user[0].map((name) => 
        {
          console.log("Name is")
          console.log(name)
          findUserInArticle(name, res, function(user)
          {    
            
            headlines.push({username: user.author, headline: user.text});
                            
          })



        })

        res.send({headlines}); 

      }
      else
      {   
          console.log("headline req")
          console.log(user[0])

          findUserInArticle(user[0], res, function(usernew)
          {   
            console.log(usernew)
            var headlines = []; 
            headlines.push({username: usernew.author, headline: usernew.text});
            res.send({headlines});    
                            
          })
      }
  }
  else
  {
          findUserInArticle(loggedInUser, res, function(usernew)
          {   
            console.log(usernew)
            var headlines = []; 
            headlines.push({username: usernew.author, headline: usernew.text});
            res.send({headlines});    
                            
          })
  }
}



const putHeadline = (req, res) =>
{
  
    findUserInArticle(loggedInUser, res, function(user)
    {   
        Article.update({"_id":ObjectId(user._id)},{$set:{text:req.body.headline}}, function (err, data)  
        {
            if(err) throw err;

            console.log("Headline updated");

            
            //console.log(data)

           

        });

        findUserInArticle(loggedInUser, res, function(user)
        {    
          
          res.send({username: loggedInUser, headline: user.text})
                          
        })
      
                      
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
      

        redis.get(req.cookies[cookieKey], function(err, val)
        {
          
          console.log(cookieKey+ ' mapped to ' + val);
          
          console.log(sessionKey)
          console.log(loggedInUser)
          console.log(val)
          //res.send("ok")

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


const getEmail = (req, res) =>
{
  if(req.params.user)
  {
    findUserInProfile(req.params.user, res, function(user)
    {   

      res.send({username: user.username, email: user.email});    
                      
    })
  }
  else
  {
      findUserInProfile(loggedInUser, res, function(user)
    {   

      res.send({username: user.username, email: user.email});    
                      
    })
  }

}

const putEmail = (req, res) =>
{
    findUserInProfile(loggedInUser, res, function(user)
    {   
        Profile.update({"_id":ObjectId(user._id)},{$set:{email:req.body.email}}, function (err, data)  
        {
            if(err) throw err;

            console.log("Email updated");

            
            

            res.send({username: loggedInUser, email: req.body.email})

        });
      
                      
    })
}



const getZipcode = (req, res) =>
{
  if(req.params.user)
  {
    findUserInProfile(req.params.user, res, function(user) 
    {   

      res.send({username: user.username, zipcode: user.zipcode});    
                      
    })
  }
  else
  {
      findUserInProfile(loggedInUser, res, function(user) 
    {   

      res.send({username: user.username, zipcode: user.zipcode});    
                      
    })
  }
}

const putZipcode = (req, res) =>
{
    findUserInProfile(loggedInUser, res, function(user)
    {   
        Profile.update({"_id":ObjectId(user._id)},{$set:{zipcode:req.body.zipcode}}, function (err, data)  
        {
            if(err) throw err;

            console.log("Zipcode updated");

            
           

            res.send({username: loggedInUser, zipcode: req.body.zipcode})

        });
      
                      
    })
}




const getAvatars = (req, res) =>
{
    if(req.params.user)
    {
      var user = req.params.user.split(',')

      if(user.length>1)
      {
        var avatars = [];

        user.map((data) => 
        {

          findUserInProfile(req.params.user, res, function(user)
          {    
            
            avatars.push({username: user.author, avatar: user.picture});
                            
          })



        })

        res.send({avatars}); 

      }
      else
      {
          findUserInProfile(req.params.user, res, function(user)
          {   

            var avatars = []; 
            avatars.push({username: user.author, avatar: user.picture});
            res.send({avatars});    
                            
          })
      }
   }
   else
   {
          findUserInProfile(loggedInUser, res, function(user)
          {   

            var avatars = []; 
            avatars.push({username: user.author, avatar: user.picture});
            res.send({avatars});    
                            
          })
   }

}

const putAvatar = (req, res) =>
{
    console.log(req.fileurl);

    findUserInProfile(loggedInUser, res, function(user)
    {   
        Profile.update({"_id":ObjectId(user._id)},{$set:{picture:req.fileurl}}, function (err, data)  
        {
            if(err) throw err;

            console.log("User Avatar updated");           
            
        });
      
                      
    })

    res.send({username: loggedInUser, avatar: req.fileurl}); 
}


const getDOB = (req, res) =>
{
  
    findUserInProfile(loggedInUser, res, function(user)
    {   

      res.send({username: user.username, dob: user.dob});    
                      
    })

}


function findUserInArticle(username, res, callback) 
{
  Article.find({ "author": username }).exec(function(err, user) 
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


function findUserInProfile(username, res, callback) 
{
  Profile.find({ "username": username }).exec(function(err, user) 
  {
    console.log(username);

    var index = (user.length>1)? user.length-1:0;  //return the latest result
    
    console.log(index)

    if(user)
    {
      console.log("It is defined")
      console.log(user);
      callback(user[index]);
    }
    else
     {
        res.sendStatus(401);
     }

    
    
  })
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
   
     app.get('/headlines/:users?', getHeadline)
     app.put('/headline',isLoggedIn, putHeadline)

     app.get('/email/:user?',isLoggedIn, getEmail)
     app.put('/email',isLoggedIn, putEmail)

     app.get('/zipcode/:user?',isLoggedIn, getZipcode)
     app.put('/zipcode',isLoggedIn, putZipcode)

     app.get('/avatars/:user?',isLoggedIn, getAvatars)
     app.put('/avatar',isLoggedIn, uploadImage('title'), putAvatar)

     
     app.get('/dob',isLoggedIn, getDOB)



    
}




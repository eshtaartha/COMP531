const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

var auth =  require("./auth")

var redis = require('redis').createClient("redis://h:pd82hf7vjmtr8i7l9nunpo0lap4@ec2-184-73-208-210.compute-1.amazonaws.com:10879")

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

  
  if(req.file)
  {
    const s = new stream.PassThrough()
    s.end(req.file.buffer)
    s.pipe(uploadStream)
    s.on('end', uploadStream.end)
  }
  else
  {
    next()
  }
  
}


const uploadImage = (publicName) => (req, res, next) =>
     multer().single('image')(req, res, () => doUpload(publicName, req, res, next))

// Define the Schemas

/////////////////////Articles Schema
var commentSchema = new mongoose.Schema(
{
  commentId: Number, 
  author: String, 
  date: Date, 
  text: String
})

var articleSchema = new mongoose.Schema(
{
  id: Number, 
  author: String, 
  img: String, 
  date: Date, 
  text: String,
  comments: [commentSchema]
})

///////////////////////////////////////////////


Article = mongoose.model('Article', articleSchema) // link the article schema to article object




function getArticles(req, res) 
{
     if(req.params.id)
     {
           console.log(1);

           findById(req.params.id, function(articles) 
           {    
                console.log(req.params.id);

                if(articles==null)
                {
                   console.log(3);
                   findByAuthor(req.params.id, function(articles) 
                   {
                        res.send({articles});
                        
                   })
                }
                else
                {       
                    var authors = [];

                    authors.push(loggedInUser);

                    findFollowerByUsername(loggedInUser, function(user) 
                    {    
                      var temp = [];

                      if(user.following.length > 1)
                      {
                        console.log("Greater than one")
                        user.following.map((data)=>
                        {
                          temp.push(data.author);
                        })

                        authors = authors.concat(temp);
                      }
                      else
                      {
                        authors.push(user.following[0].author)
                      }


                      findByAuthor2(authors, function(articles) 
                      {    
                        console.log(authors);
                        res.send({articles})
                                        
                      })

                                      
                    })
                }
           }) 
        
     }
     else
     {
            
              var authors = [];

              authors.push(loggedInUser);

              findFollowerByUsername(loggedInUser, function(user) 
              {    
                var temp = [];

                if(user.following.length > 1)
                {
                  console.log("Greater than one")
                  user.following.map((data)=>
                  {
                    temp.push(data.author);
                  })

                  authors = authors.concat(temp);
                }
                else
                {
                  authors.push(user.following[0].author)
                }


                findByAuthor2(authors, function(articles) 
                {    
                  console.log(authors);
                  res.send({articles})
                                  
                })

                                
              })


              
     }    
}



function editArticle(req, res) 
{
  var id = req.params.id;

  
    findById(id, function(articles) 
       {
           console.log(articles) 
          if(articles)
          {
            console.log("Article to edit found");
            if(articles[0].author == loggedInUser)
            {
                
                console.log("Article to edit not owned by user")
                if(req.body.commentId == null)
                {
                  
                  
                  Article.update({"_id":ObjectId(id)},{$set:{text: req.body.text}}, function (err, data) 
                  {
                      
                      

                  });

                  findById(id, function(articles) 
                           {    
                                
                                res.send({articles})
                                
                           })
                }
                else if(req.body.commentId != null)
                {
                  if(req.body.commentId == -1)
                  {
                    
                    var cid = new Date().valueOf();
                    console.log(id);
                    

                    Article.update({"_id":ObjectId(id)},{$push:{comments:{commentId: cid, author: loggedInUser, date: new Date().getTime(),text: req.body.text}}}, function (err, data) 
                    {
                        
                        

                    });

                    
                    findById(id, function(articles) 
                             {    
                                  
                                  res.send({articles})
                                  
                             })
                  }
                  else
                  {
                    console.log("comment id not null")
                    

                    Article.update({"_id":ObjectId(id), "comments.commentId": req.body.commentId},{$set:{comments:{text: req.body.text}}}, function (err, data) 
                    {
                        
                        

                    });

                    findById(id, function(articles) 
                             {    
                                  res.send({articles})
                                  
                             })
                  }
                }

            }
            else
            {
            res.send(401);
            } 
          }
          else
          { 
            console.log("Article to edit not found")
            res.send(401);
          }

            
       })

}


function postArticle(req, res) 
{
  var id = new Date().valueOf();

  console.log("The content of POST article is")
  
    console.log(req.body); 
    console.log(req.fileurl) 
  

      new Article({ id: id, author: loggedInUser, img: req.fileurl, date: new Date().getTime(), text: req.body.text}).save({},function (err, articlesOrig) 
      {
          var articles = [];
          articles.push(articlesOrig);
          console.log("Post artcile works")
          res.send({articles});

      })

  
  

}



function findCount(req, res) 
{
  Article.count({author:req.params.user}, function (err, count) 
  {
      
      res.send({count});

  });
}

function removeUser(req, res) 
{

  var remove = []

  Article.remove({'author':req.params.id}, function (err, data) 
  {
      
      remove.push({data});

  });

  Profile.remove({'username':req.params.id}, function (err, data) 
  {
      
      remove.push({data});

  });

  User.remove({'username':req.params.id}, function (err, data) 
  {
      
      remove.push({data});

  });

  res.send({remove})


}

function findByAuthor(author, callback) 
{
  Article.find({ "author": author}).exec(function(err, articles) 
  {
    callback(articles);
  })
}

function findByAuthor2(authors, callback) 
{
  Article.find({ author: {$in: authors}}).sort({date:-1}).limit(10).exec(function(err, articles) 
  {
    callback(articles);
  })
}

function findById(id, callback) 
{
  Article.find({"_id":ObjectId(id)}).exec(function(err, articles) 
  {
    callback(articles);
  })
}


function findFollowerByUsername(username, callback) 
{
  Profile.find({ "username": username }).exec(function(err, user) 
  {
    var index = (user.length>1)? user.length-1:0;  //return the latest result
    callback(user[index]);
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

function removeFollowerByUsername(username, callback) 
{
  Profile.remove({ "username": username }).exec(function(err, articles) 
  {
    callback(articles);
  })
}


const app = express()
app.use(bodyParser.json())





module.exports = app => 
{
	app.get('/articles/:id*?',isLoggedIn, getArticles)
	app.put('/articles/:id',isLoggedIn, editArticle)
	app.post('/article',isLoggedIn, uploadImage('title'), postArticle)
  app.get('/remove/:id',isLoggedIn, removeUser)
	
}



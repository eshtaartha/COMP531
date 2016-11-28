const express = require('express')
const bodyParser = require('body-parser')

var auth =  require("./auth")


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
                {       console.log(4);
                        res.send({articles});
                }
           }) 
        
     }
     else
     {
              findByAuthor(loggedInUser, function(articles) 
              {    
                console.log(2);
                res.send({articles})
                                
              })
     }    
}



function editArticle(req, res) 
{
  var id = req.params.id;

  
    findById(id, function(articles) 
       {
            
          if(articles)
          {
            if(articles[0].author == loggedInUser)
            {
                

                if(req.body.commentId == null)
                {
                  
                  
                  Article.update({id:id},{$set:{text: req.body.text}}, function (err, data) 
                  {
                      
                      console.log({data});

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
                    

                    Article.update({id:id},{$push:{comments:{commentId: cid, author: loggedInUser, date: new Date().getTime(),text: req.body.text}}}, function (err, data) 
                    {
                        
                        console.log({data});

                    });

                    
                    findById(id, function(articles) 
                             {    
                                  
                                  res.send({articles})
                                  
                             })
                  }
                  else
                  {
                    console.log("comment id not null")
                    

                    Article.update({id:id, "comments.commentId": req.body.commentId},{$set:{comments:{text: req.body.text}}}, function (err, data) 
                    {
                        
                        console.log({data});

                    });

                    findById(id, function(articles) 
                             {    
                                  //console.log(2);
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
            res.send(401);
          }

            
       })

}


function postArticle(req, res) 
{
  var id = new Date().valueOf();

  new Article({ id: id, author: loggedInUser, img: null, date: new Date().getTime(), text: req.body.text}).save({},function (err, articles) 
  {
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
  Article.find({ "author": author }).exec(function(err, articles) 
  {
    callback(articles);
  })
}

function findById(id, callback) 
{
  Article.find({ "id": id }).exec(function(err, articles) 
  {
    callback(articles);
  })
}


function findFollowerByUsername(username, callback) 
{
  Profile.find({ "username": username }).exec(function(err, articles) 
  {
    callback(articles);
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
	app.post('/article', isLoggedIn, postArticle)
  app.get('/remove/:id', removeUser)
	
}



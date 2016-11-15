const express = require('express')
const bodyParser = require('body-parser')

articles = [
{
  id:1,
  author:"Goku", // default user
  text:"This is my first article"
},
{
  id:2,
  author:"Vageta",
  text:"This is my second article"
},
{
  id:3,
  author:"MajinBuu",
  text:"This is my third article"
}
];

const hello = (req, res) => res.send({ hello: 'world' })

const addArticle = (req, res) => 
{
     console.log('Payload received', req.body)

     articleId++;
      
     articles.push(
     {
	     id:articleId,
	     author:"Goku",
	     text:req.body.body
     }) 
     
     res.send(articles[articleId-1])
}



const sendBackArticles = (req, res) => 
{

	id = req.params.id;

	console.log(id)

	//res.send("working properly")

	idFound = articles.find((data) =>
	{
		if(data.id ==id)
		{
		 res.send(articles[id-1])
		}
	});

	if(!(idFound))
	{
		res.send(articles)
	}

}

const modifyArticles = (req, res) => 
{

	id = req.params.id;

	//console.log(id)

	//res.send("working properly")

	idFound = articles.find((data) =>
	{
		if(data.id == id)
		{
		 articles[id-1].text = req.body.text
		 res.send(articles[id-1])
		}
	});

	if(!(idFound))
	{
		res.send(articles[0])
	}

}



module.exports = app => 
{
	app.get('/', hello)
	app.post('/article', addArticle)
	app.get('/articles/:id?',sendBackArticles) 
	app.put('/articles/:id?',modifyArticles)
}



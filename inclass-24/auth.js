const md5 = require('md5')



const express = require('express')

const bodyParser = require('body-parser')



var cookieParser = require('cookie-parser');



var redis = require('redis').createClient("redis://h:pd82hf7vjmtr8i7l9nunpo0lap4@ec2-184-73-208-210.compute-1.amazonaws.com:10879")



var sid=0;





database = [];



status=0;



cookieKey = 'key';



const index = (req, res) => 

{

    //res.cookie(cookieKey,sid,{maxAge:3600*1000,httpOnly:true}).send("Can you view the cookie?")



     res.send({ hello: 'world' })

}





const registerUser = (req, res) =>

{

 password = req.body.password;

 salt = "This is the salt";



 database.push(

 {

 salt:salt,

 username:req.body.username,

 hash:md5(password+salt)

 });



 res.send("Registered successfully");



}



const loginUser = (req, res) =>

{

 

 loginUsername = req.body.username;

 loginPassword = req.body.password;



 

 



 returnVal=database.find((data)=>

 {

  if(loginUsername == data.username)

   {

    verifyHash = md5(loginPassword + data.salt);

    

    if(verifyHash == data.hash)

     {

      sid++;

      res.cookie(cookieKey,sid,{maxAge:3600*1000,httpOnly:true})

      redis.set(sid,loginUsername);

      res.send("Logged in successfully");

      status=1;

     }

   }

 });



 if((returnVal)|(status))

 {

  status=0;

 }

 else

 {

  res.sendStatus(401);

 }



}



const logout = (req, res) =>

{

  console.log("The cookie is:  ", req.cookies)

  redis.get(req.cookies[cookieKey], function(err, val)

  {

    console.log(cookieKey+ ' mapped to ' + val);

    res.send("ok")

  })



}





const app = express()

app.use(bodyParser.json())

app.use(cookieParser())



     app.get('/', index)



     app.post('/register',registerUser)

     

     app.post('/login',loginUser)

     

     app.get('/logout', logout)




const port = process.env.PORT || 3000

const server = app.listen(port, () => {

     const addr = server.address()

     console.log(`Server listening at http://${addr.address}:${addr.port}`)

})


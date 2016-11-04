const md5 = require('md5')

database = [];

status=0;

const index = (req, res) => 
{
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) =>
{
  console.log(req.payload);
  res.send(
          {headlines:[
          {
          username: 'Kakorat',
          headline: 'Kakorat is always ahead of Vageta'
          },
          {
          username: 'Whis',
          headline: 'Whis is always calm'
          },
          {
          username: 'Beerus',
          headline: 'DBZ rocks'
          }]})


}

const putHeadline = (req, res) =>
{

res.send(
        {headlines:[
        {
         username: 'Goku',
         headline: req.body.headline || ' you did not supply it'
        }]})
}




const getEmail = (req, res) =>
{
  
  res.send(
          {headlines:[
          {
          username: 'Kakorat',
          email: 'abc@gmail.com'
          },
          {
          username: 'Whis',
          email: 'def@gmail.com'
          },
          {
          username: 'Beerus',
          email: 'ghi@gmail.com'
          }]})


}

const putEmail = (req, res) =>
{

res.send(
        {headlines:[
        {
         username: 'Goku',
         email: req.body.email || ' you did not supply it'
        }]})
}



const getZipcode = (req, res) =>
{
  
  res.send(
          {headlines:[
          {
          username: 'Kakorat',
          zipcode: '77001'
          },
          {
          username: 'Whis',
          zipcode: '77002'
          },
          {
          username: 'Beerus',
          zipcode: '77003'
          }]})


}

const putZipcode = (req, res) =>
{

res.send(
        {headlines:[
        {
         username: 'Goku',
         zipcode: req.body.zipcode || ' you did not supply it'
        }]})
}




const getAvatars = (req, res) =>
{
  
  res.send(
          {headlines:[
          {
          username: 'Kakorat',
          avatar: 'http://farikogaming.com/profile/image/profile_image/35151/xxlarge/_v=1434925366'
          },
          {
          username: 'Whis',
          avatar: 'http://vignette3.wikia.nocookie.net/dragonball/images/1/18/Whisinfo.png/revision/latest?cb=20160807084658'
          },
          {
          username: 'Beerus',
          avatar: 'http://vignette1.wikia.nocookie.net/dragonball/images/7/7d/Cvvcvcvvvvv.jpg/revision/latest?cb=20160423050835'
          }]})


}

const putAvatar = (req, res) =>
{

res.send(
        {headlines:[
        {
         username: 'Goku',
         avatar: req.body.avatar || ' you did not supply it'
        }]})
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
 cookieKey = 'key';
 loginUsername = req.body.username;
 loginPassword = req.body.password;

 
 

 returnVal=database.find((data)=>
 {
  if(loginUsername == data.username)
   {
    verifyHash = md5(loginPassword + data.salt);
    
    if(verifyHash == data.hash)
     {
      res.cookie(cookieKey,12345,{maxAge:3600*1000,httpOnly:true})
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


module.exports = app => 
{
     app.get('/', index)
   
     app.get('/headlines/:user?',getHeadline)
     app.put('/headline',putHeadline)

     app.get('/email/:user?',getEmail)
     app.put('/email',putEmail)

     app.get('/zipcode/:user?',getZipcode)
     app.put('/zipcode',putZipcode)

     app.get('/avatars/:user?',getAvatars)
     app.put('/avatar',putAvatar)

     app.post('/register',registerUser)
     
     app.post('/login',loginUser)
     
}

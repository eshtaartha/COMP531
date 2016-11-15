
const registerUser = (req, res) =>
{
 password = req.body.password;
 salt = "This is the salt";

 profileData.push(
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

 
 returnVal=profileData.find((data)=>
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

const logout = (req, res) =>
{
  res.send(200);
}


module.exports = app => 
{
   
     app.post('/register',registerUser)
     
     app.post('/login',loginUser)

     app.put('/logout',logout)
     
}

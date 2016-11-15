
const getFollowers = (req, res) =>
{
  res.send(
    {username:profileData[0].user,
     following:profileData[0].following})
}

const putFollowers = (req, res) =>
{
  user = req.params.user;

  if(!(req.body == undefined))
  {
    profileData[0].following.push(user)

    res.send(
    {username:profileData[0].user,
     following:profileData[0].following})
    
  }
  
}

const deleteFollowers = (req, res) =>
{
  res.send(
    {username:profileData[0].user,
     following:profileData[1].following})
}

module.exports = app => 
{

     app.get('/following/:user?',getFollowers)
     app.put('/following/:user',putFollowers)
     app.delete('/following/:user',deleteFollowers)
}

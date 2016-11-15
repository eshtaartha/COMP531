profileData = [
{
user: "Goku", //default user
headline: 'Kakorat is always ahead of Vageta',
email: 'abc@gmail.com',
zipcode: '77001',
avatar: 'http://farikogaming.com/profile/image/profile_image/35151/xxlarge/_v=1434925366',
dob:969720300000,
following:[1,2,3]
},
{
user: "Vageta",
headline: 'Whis is always calm',
email: 'def@gmail.com',
zipcode: '77002',
avatar: 'http://vignette3.wikia.nocookie.net/dragonball/images/1/18/Whisinfo.png/revision/latest?cb=20160807084658',
following:[17,19,20]
},
{
user: "MajinBuu",
headline: 'DBZ rocks',
email: 'ghi@gmail.com',
zipcode: '77003',
avatar: 'http://vignette1.wikia.nocookie.net/dragonball/images/7/7d/Cvvcvcvvvvv.jpg/revision/latest?cb=20160423050835'
}];


const getHeadline = (req, res) =>
{
  //console.log(req.payload);
  

  if(req.params.user==undefined) //return headline for logged in user
  {
    res.send({headlines:[
    {
      username:profileData[0].user,
      headline:profileData[0].headline
    }
      ]
      })
  }

  user = req.params.user.split(',')

  temp = [];
  found=0;

  user.find((userName) =>
  {
    profileData.find((data) =>
    {
      if(data.user == userName)
      {
       temp.push(
       {
        username:data.user,
        headline:data.headline
       })
       found=true;
      }
    });

  })

  if(found) //send headline for requested user
  {
    res.send(temp);
    
  }
  else
  {
    //console.log("Temp not found sent")
    res.send({headlines:[
    {
      username:profileData[0].user,
      headline:profileData[0].headline
    }
      ]
      })
  }
}

const putHeadline = (req, res) =>
{
  console.log(req.body.headline)

  if(!(req.body.headline == undefined))
  {
    profileData[0].headline = req.body.headline;
    res.send(profileData[0].headline)
  }
  else
  {
    res.send("You did not define headline")
  }
}




const getEmail = (req, res) =>
{
  
  user = req.params.user;

  idFound = profileData.find((data) =>
  {
    if(data.user == user)
    {
     res.send(data.email)
    }
  });

  if(!(idFound))
  {
    res.send(profileData[0].email) //send defaul email if user not found
  }

}

const putEmail = (req, res) =>
{
  profileData[0].email = req.body.email; //update the email id of default user
  res.send(profileData[0].email)
}



const getZipcode = (req, res) =>
{
  user = req.params.user;

  idFound = profileData.find((data) =>
  {
    if(data.user == user)
    {
     res.send(
      {username:data.user,
       zipcode:data.zipcode
      })
    }
  });

  if(!(idFound))
  {
    res.send({username:profileData[0].user,
       zipcode:profileData[0].zipcode
      }) 
  }
}

const putZipcode = (req, res) =>
{
  profileData[0].zipcode = req.body.zipcode; //update the email id of default user
  res.send({username:profileData[0].user,
       zipcode:profileData[0].zipcode
      })
}




const getAvatars = (req, res) =>
{
  if(req.params.user==undefined)
  {
    res.send({avatars:[
    {
      username:profileData[0].user,
      avatar:profileData[0].avatar
    }
    
      ]
      })
  }

  user = req.params.user.split(',')

  temp = [];
  found=0;

  user.find((userName) =>
  {
    profileData.find((data) =>
    {
      if(data.user == userName)
      {
       temp.push(
       {
        username:data.user,
        avatar:data.avatar
       })
       found=true;
      }
    });

  })

  if(found)
  {
    res.send(temp);
    
  }
  else
  {
    //console.log("Temp avatar not found sent")
    res.send({headlines:[
    {
      username:profileData[0].user,
      headline:profileData[0].avatar
    }
      ]
      })
  }
  

}

const putAvatar = (req, res) =>
{

if(!(req.body.avatar == undefined))
  {
    profileData[0].avatar = req.body.avatar;
    res.send(profileData[0].avatar)
  }
  else
  {
    res.send("You did not define avatar")
  }
}

const getDOB = (req, res) =>
{
  res.send(profileData[0].dob);

}



module.exports = app => 
{
   
     app.get('/headlines/:user?',getHeadline)
     app.put('/headline',putHeadline)

     app.get('/email/:user?',getEmail)
     app.put('/email',putEmail)

     app.get('/zipcode/:user?',getZipcode)
     app.put('/zipcode',putZipcode)

     app.get('/avatars/:user?',getAvatars)
     app.put('/avatar',putAvatar)
     
     app.get('/dob',getDOB)

    // app.get('/following/:user?',getFollowers)
    // app.put('/following/:user',putFollowers)
    // app.delete('/following/:user',deleteFollowers)
}
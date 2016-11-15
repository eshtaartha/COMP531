import resource from "./webComm"

var data={};
var sidebar=[];
var following=[];
var temp={}

const login = () => 
{
  
  const username = document.querySelector("#login_name").value
  const password = document.querySelector("#login_password").value
  
  return resource('POST', 'login', { username, password })
   
}

const logout = () => 
{
  return resource('PUT', 'logout')
    
}

const headline = () =>
{
  return resource('GET', 'headlines')
}

const avatars = () =>
{
  return resource('GET', 'avatars')
}




const articles = () =>
{
  return resource('GET','articles')
}




const updateHeadline = () =>
{
  const newHeadline = document.querySelector("#status_update_input").value

  return resource('POST','article',newHeadline)
}

const sidebarData = () =>
{

  return resource('GET','headlines/psd3test,sep1')
}

const sidebarPics = () =>
{

  return resource('GET','avatars/psd3test,sep1')
}

const getFollowing = () =>
{

  return resource('GET','following')
}

const removeFollowing = (user) =>
{
   
  return resource('DELETE',`following/${user}`)//resource('DELETE','following/'+{user})
}


const getFollowingHeadline = (user) =>
{
  return resource('GET', `headlines/${user}`)
}

const getFollowingAvatar = (user) =>
{
  return resource('GET', `avatars/${user}`)
}


export const addFollowing = (user) =>
{
  var followingUser = document.getElementById("addFollowingText").value;

  alert(followingUser)
  
  return (dispatch)=>
  {
    resource('PUT', `following/${followingUser}`)
    .then(r=>getFollowing())
    .then(r=>{data.following = r.following; following = []; following = r.following; console.log(following)})
    .catch(r => alert(`"${r.message}" when fetching following`) )

                    .then(r=>{following.map((user)=> //get details of following
                    {
                      //console.log(user)
                      getFollowingHeadline(user)
                      .then(r=>temp.headline=r.headlines[0].headline)
                      .then(r=>getFollowingAvatar(user))
                      .then(r=>temp.avatar=r.avatars[0].avatar)
                      .then(r=>sidebar.push({username:user, headline:temp.headline, avatar:temp.avatar}))
                      
                      
                    }
                    )
                      console.log(sidebar)
                      dispatch({type:"FOLLOWING_ADDED",payload:sidebar})

                    })

    
      
       

    .catch(r => alert(`"${r.message}" when adding following user`) )
  }

}

export const deleteFollowing = (followingUser) =>
{
  //var followingUser = document.getElementById("addFollowingText").value;

  console.log(followingUser)
  
  return (dispatch)=>
  {
    resource('DELETE', `following/${followingUser}`)
    .then(r=>getFollowing())
    .then(r=>{data.following = r.following; following = r.following; console.log(following)})
    .catch(r => alert(`"${r.message}" when fetching following`) )

                    .then(r=>{following.map((user)=> //get details of following
                    {
                      //console.log(user)
                      getFollowingHeadline(user)
                      .then(r=>temp.headline=r.headlines[0].headline)
                      .then(r=>getFollowingAvatar(user))
                      .then(r=>temp.avatar=r.avatars[0].avatar)
                      .then(r=>sidebar.push({username:user, headline:temp.headline, avatar:temp.avatar}))
                      
                      
                    }
                    )
                      console.log(sidebar)
                      dispatch({type:"FOLLOWING_DELETED",payload:sidebar})

                    })

    
      
       

    .catch(r => alert(`"${r.message}" when adding following user`) )
  }

}


export const authenticateLogin=function() 
{
  return (dispatch)=>
  {
    login()
    .then(data1=>{
                  if(data1.result=="success")
                  {
                   //getData();
                   //dispatch({type:"",payload:""})

                    headline()
                    .then(r=>{data.headline=r.headlines[0].headline;data.username=r.headlines[0].username})
                    .catch(r => alert(`"${r.message}" when fetching headline`) )

                    

                    .then(r=>getFollowing())
                    .then(r=>{data.following = r.following; following = r.following; console.log(following)})
                    .catch(r => alert(`"${r.message}" when fetching following`) )

                    .then(r=>{following.map((user)=> //get details of following
                    {
                      //console.log(user)
                      getFollowingHeadline(user)
                      .then(r=>temp.headline=r.headlines[0].headline)
                      .then(r=>getFollowingAvatar(user))
                      .then(r=>temp.avatar=r.avatars[0].avatar)
                      .then(r=>sidebar.push({username:user, headline:temp.headline, avatar:temp.avatar}))
                      
                      
                    }
                    )
                      console.log(sidebar)
                      data.sidebar = sidebar

                    })

                    .then(r=>avatars())
                    .then(r=>{data.avatar=r.avatars[0].avatar})
                    .catch(r => alert(`"${r.message}" when fetching avatar`) )

                    /*.then(r=>email())
                    .then(r=>{data.email=r.email})
                    .catch(r => alert(`"${r.message}" when fetching email`) )

                    .then(r=>zipcode())
                    .then(r=>{data.zipcode=r.zipcode})
                    .catch(r => alert(`"${r.message}" when fetching zipcode`) )*/

                    .then(r=>articles())
                    .then(r=>{data.articles=r.articles})
                    .catch(r => alert(`"${r.message}" when fetching articles`) )

                    //.then(r=> console.log(sidebar))
                    //.then(r=> data.sidebar = sidebar)
                    .then(r=>{
                              //console.log(sidebar)
                              //data.sidebar = sidebar
                              dispatch({type:"DATA_FETCHED",payload:data})
                            })

                    /*.then(r=>sidebarData())
                    .then(r=>{sidebar.Data=r.headlines})
                    .catch(r => alert(`"${r.message}" when fetching sidebar articles`) )

                    .then(r=>sidebarPics())
                    .then(r=>{sidebar.Pics=r.avatars;
                              data.sidebar = sidebar.Data.map(function(o,i){return [o, sidebar.Pics[i]]})
                              })
                    .catch(r => alert(`"${r.message}" when fetching sidebar pictures`) ) */

                    

                    //.then(r=>getFollowing())
                    //.then(r=>{console.log(r)})

                    //removeFollowing(sep1)
                    //.then(r=>{console.log(r)})

                    //addFollowing(sep1)
                    //.then(r=>{console.log(r)})
                    

                   
                  }

                })
              
              .catch(data1 => alert(`Your login is"${data1.message || 'Error'}"`))
  }

}



export const logoutUser=function() 
{
  return (dispatch)=>
  {
    logout()
    .then(r=>{
      
       dispatch({type:"LANDING_PAGE",payload:""})
       alert("You have logged out")

     })
    .catch(r => alert(`"${r.message}" when logging out`) )
  }

}



export const updateStatus=function() 
{
  return (dispatch)=>
  {
    updateHeadline()
    .then(r=>{
      
       dispatch({type:"STATUS_UPDATED",payload:r.headline})

     })
    .catch(r => alert(`"${r.message}" when updating status`) )
  }

}





/*export const getProfileData = function()
{

 



 //resource('GET', 'headlines')
//getAvatar();
//getEmail();
//getZipcode();

}*/




/*import resource from "./webComm"

var data={};
var sidebar={};

const login = () => 
{
  
  const username = document.querySelector("#login_name").value
  const password = document.querySelector("#login_password").value
  
  return resource('POST', 'login', { username, password })
   
}

const logout = () => 
{
  return resource('PUT', 'logout')
    
}

const headline = () =>
{
  resource('GET', 'headlines')
  .then(r=>{data.headline=r.headlines[0].headline;
            data.username=r.headlines[0].username;
           })
  .catch(r => alert(`"${r.message}" when fetching headline`) )
}

const avatars = () =>
{
  resource('GET', 'avatars')
  .then(r=>{data.avatar=r.avatars[0].avatar;
           })
  .catch(r => alert(`"${r.message}" when fetching avatar`) )
}

const zipcode = () =>
{
  resource('GET', 'zipcode')
  .then(r=>{data.zipcode=r.zipcode})
  .catch(r => alert(`"${r.message}" when fetching zipcode`) )
}

const email = () =>
{
  resource('GET', 'email')
  .then(r=>{data.email=r.email})
  .catch(r => alert(`"${r.message}" when fetching email`) )
}

const articles = () =>
{
  resource('GET','articles')
  .then(r=>{data.articles=r.articles})
  .catch(r => alert(`"${r.message}" when fetching articles`) )
}

const dob = () =>
{
  resource('GET','dob')
  .then(r=>{data.dob=r.dob})
  .catch(r => alert(`"${r.message}" when fetching date of birth`) ) 

}



const updateHeadline = () =>
{
  const newHeadline = document.querySelector("#status_update_input").value

  return resource('POST','article',newHeadline)
}

const sidebarData = () =>
{

  resource('GET','headlines/psd3test,sep1')
  .then(r=>{sidebar.Data=r.headlines})
  .catch(r => alert(`"${r.message}" when fetching sidebar articles`) )
}

const sidebarPics = () =>
{

  resource('GET','avatars/psd3test,sep1')
  .then(r=>{sidebar.Pics=r.avatars;
            data.sidebar = sidebar.Data.map(function(o,i){return [o, sidebar.Pics[i]]})
            })
  .catch(r => alert(`"${r.message}" when fetching sidebar pictures`) ) 
}



export const authenticateLogin=function() 
{
  return (dispatch)=>
  {
    login()
    .then(data1=>{
                  if(data1.result=="success")
                  {
                   //getData();
                   //dispatch({type:"",payload:""})

                    //Promise.all([headline(), avatars(), email(), zipcode(), articles(), sidebarData(), sidebarPics(), dob()])
                    Promise.all([headline(), avatars(), articles(), sidebarData(), sidebarPics()])
                    .then(r=>{
                              console.log(data)
                              dispatch({type:"DATA_FETCHED",payload:data})
                            })


                   
                  }

                })
    .catch(data1 => alert(`Your login is"${data1.message || 'Error'}"`))
  }

}



export const logoutUser=function() 
{
  return (dispatch)=>
  {
    logout()
    .then(r=>{
      
       dispatch({type:"LANDING_PAGE",payload:""})
       alert("You have logged out")

     })
    .catch(r => alert(`"${r.message}" when logging out`) )
  }

}

export const updateStatus=function() 
{
  return (dispatch)=>
  {
    updateHeadline()
    .then(r=>{
      
       dispatch({type:"STATUS_UPDATED",payload:r.headline})

     })
    .catch(r => alert(`"${r.message}" when updating status`) )
  }

}





export const getData = function()
{

 return (dispatch)=>
  {
    headline()
    .then(r=>{data.headline=r.headlines[0].headline;data.username=r.headlines[0].username})
    .catch(r => alert(`"${r.message}" when fetching headline`) )

    avatars()
    .then(r=>{data.avatar=r.avatars[0].avatar})
    .catch(r => alert(`"${r.message}" when fetching avatar`) )

    email()
    .then(r=>{data.email=r.email})
    .catch(r => alert(`"${r.message}" when fetching email`) )

    zipcode()
    .then(r=>{data.zipcode=r.zipcode})
    .catch(r => alert(`"${r.message}" when fetching zipcode`) )

    articles()
    .then(r=>{data.articles=r.articles})
    .catch(r => alert(`"${r.message}" when fetching articles`) )

    sidebarData()
    .then(r=>{data.sidebarData=r.headlines})
    .catch(r => alert(`"${r.message}" when fetching sidebar articles`) )

    sidebarPics()
    .then(r=>{data.sidebarPics=r.avatars})
    .catch(r => alert(`"${r.message}" when fetching sidebar pictures`) ) 



    .then(r=>{
              dispatch({type:"MAIN_PAGE",payload:data})
            })
  }













 //resource('GET', 'headlines')
//getAvatar();
//getEmail();
//getZipcode();

}

*/

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
  document.getElementById("addFollowingText").value = ""

  alert(followingUser)
  var sidebar1 = [];
  return (dispatch)=>
  {
                    resource('PUT', `following/${followingUser}`)
                    .then(r=>
                    {      
                    
                    r.following.map((user)=> //get details of following
                    {
                       getFollowingHeadline(user)
                      .then(r=>temp.headline=r.headlines[0].headline)
                      .then(r=>getFollowingAvatar(user))
                      .then(r=>temp.avatar=r.avatars[0].avatar)
                      .then(r=>sidebar1.push({username:user, headline:temp.headline, avatar:temp.avatar}))
                      .then(r=>dispatch({type:"FOLLOWING_ADDED",payload:sidebar1}))
                                          
                    }
                    )
                      
                      
                    })
                    

    .catch(r => alert(`"${r.message}" when adding following user`) )
  }

}

export const deleteFollowing = (followingUser) =>
{
  
  
  alert(followingUser)
  var sidebar2 = [];
  return (dispatch)=>
  {
                    resource('DELETE', `following/${followingUser}`)
                    .then(r=>
                    {
                    

                      r.following.map((user)=> //get details of following
                      {
                        
                        getFollowingHeadline(user)
                        .then(r=>temp.headline=r.headlines[0].headline)
                        .then(r=>getFollowingAvatar(user))
                        .then(r=>temp.avatar=r.avatars[0].avatar)
                        .then(r=>sidebar2.push({username:user, headline:temp.headline, avatar:temp.avatar}))
                        .then(r=>dispatch({type:"FOLLOWING_DELETED",payload:sidebar2}))
                      })

                        
                        console.log(sidebar2)
                                                           

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
                    headline()
                    .then(r=>{data.headline=r.headlines[0].headline;data.username=r.headlines[0].username})
                    .catch(r => alert(`"${r.message}" when fetching headline`) )

                    

                    .then(r=>getFollowing())
                    .then(r=>{

                    data.following = r.following; 
                    console.log(r.following)
                    sidebar = [];
                    r.following.map((user)=> //get details of following
                    {
                      //console.log(user)
                      getFollowingHeadline(user)
                      .then(r=>temp.headline=r.headlines[0].headline)
                      .then(r=>getFollowingAvatar(user))
                      .then(r=>temp.avatar=r.avatars[0].avatar)
                      .then(r=>
                            { 
                              console.log("sidebar pushed")
                              sidebar.push({username:user, headline:temp.headline, avatar:temp.avatar})
                            }
                           )
                      
                      
                    }
                    )
                      console.log(sidebar)
                      data.sidebar = sidebar
                      console.log("Sidebar updated")

                    })
                    

                    .catch(r => alert(`"${r.message}" when fetching following`) )
                    .then(r=>avatars())
                    .then(r=>{data.avatar=r.avatars[0].avatar})
                    .catch(r => alert(`"${r.message}" when fetching avatar`) )

                    
                    .then(r=>articles())
                    .then(r=>{data.articles=r.articles})
                    .catch(r => alert(`"${r.message}" when fetching articles`) )

                    .then(r=>{
                              
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






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

const fbAuthStatus = () => 
{
  return resource('GET', 'fbAuthStatus')
    
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

  console.log(followingUser)
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
                    

    .catch(r => console.log(`"${r.message}" when adding following user`) )
  }

}

export const deleteFollowing = (followingUser) =>
{
  
  
  console.log(followingUser)
  var sidebar2 = [];
  return (dispatch)=>
  {
                    resource('DELETE', `following/${followingUser}`)
                    .then(r=>
                    {
                    
                      console.log(r.following)
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

    .catch(r => console.log(`"${r.message}" when adding following user`) )
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
                    .catch(r => console.log(`"${r.message}" when fetching headline`) )

                    

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
                    

                    .catch(r => console.log(`"${r.message}" when fetching following`) )
                    .then(r=>avatars())
                    .then(r=>{data.avatar=r.avatars[0].avatar})
                    .catch(r => console.log(`"${r.message}" when fetching avatar`) )

                    
                    .then(r=>articles())
                    .then(r=>{data.articles=r.articles})
                    .catch(r => console.log(`"${r.message}" when fetching articles`) )

                    .then(r=>{
                              
                              dispatch({type:"DATA_FETCHED",payload:data})
                            })

                    
                   
                  }

                })
              
              .catch(data1 => console.log(`Your login is"${data1.message || 'Error'}"`))
  }

}



export const loginFB=function() 
{
  
  //window.location.href = "https://www.facebook.com/dialog/oauth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ffacebook%2Fcallback&client_id=1086176131500701"
  window.location.href = "https://www.facebook.com/login.php?skip_api_login=1&api_key=1086176131500701&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.8%2Fdialog%2Foauth%3Fredirect_uri%3Dhttp%253A%252F%252Fstudybuddy8.herokuapp.com%252Fauth%252Ffacebook%252Fcallback%26response_type%3Dcode%26client_id%3D1086176131500701%26ret%3Dlogin%26logger_id%3D363cdee1-da8d-40b8-8f1c-e116475a0500&cancel_url=http%3A%2F%2Fstudybuddy8.herokuapp.com%2Fauth%2Ffacebook%2Fcallback%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%23_%3D_&display=page&locale=en_US&logger_id=363cdee1-da8d-40b8-8f1c-e116475a0500"
  
  return {type:"FB_NOT_AUTHENTICATED",payload:""}
}


export const authenticateFB=function() 
{
  return (dispatch)=>
  {
    console.log("Auth FB called")

    fbAuthStatus()
    .then(r=>
    {
      

      if(r.result=="success")
      { 

            
            
                          
                            headline()
                            .then(r=>{data.headline=r.headlines[0].headline;data.username=r.headlines[0].username})
                            .catch(r => console.log(`"${r.message}" when fetching headline`) )

                            

                            .then(r=>getFollowing())
                            .then(r=>{

                            data.following = r.following; 
                            console.log(r.following)
                            sidebar = [];
                            following = [];
                            following = r.following;
                            
                            following.map((user)=> //get details of following
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
                            

                            .catch(r => console.log(`"${r.message}" when fetching following`) )
                            .then(r=>avatars())
                            .then(r=>{data.avatar=r.avatars[0].avatar})
                            .catch(r => console.log(`"${r.message}" when fetching avatar`) )

                            
                            .then(r=>articles())
                            .then(r=>{data.articles=r.articles})
                            .catch(r => console.log(`"${r.message}" when fetching articles`) )

                            .then(r=>{
                                      
                                      dispatch({type:"FB_AUTHENTICATED",payload:data})
                                    }) 

                            
                           
                          

                        
                      
                      
          }
          else
          {
            dispatch({type:"FB_NOT_AUTHENTICATED",payload:""})
          }
        
      })
      
    
                        
  }

}


export const logoutUser=function() 
{
  return (dispatch)=>
  {
    logout()
    .then(r=>{
      
       dispatch({type:"LANDING_PAGE",payload:""})
       console.log("You have logged out")

     })
    .catch(r => console.log(`"${r.message}" when logging out`) )
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
    .catch(r => console.log(`"${r.message}" when updating status`) )
  }

}






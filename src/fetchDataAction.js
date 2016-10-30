import resource from "./webComm"

var data={};

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

const zipcode = () =>
{
  return resource('GET', 'zipcode')
}

const email = () =>
{
  return resource('GET', 'email')
}

const articles = () =>
{
  return resource('GET','articles')
}

const dob = () =>
{
  return resource('GET','dob')
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

    dob()
    .then(r=>{data.dob=r.dob})
    .catch(r => alert(`"${r.message}" when fetching date of birth`) ) 



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



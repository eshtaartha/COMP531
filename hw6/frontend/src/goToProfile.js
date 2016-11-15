import resource from "./webComm"

var profileData = {};

const email = () =>
{
	  return resource('GET', 'email')
}

const zipcode = () =>
{
  return resource('GET', 'zipcode')
}

const dob = () =>
{
  return resource('GET','dob')
}


export const goToProfile=function() 
{
    //alert("Going to profile tadaa");

    return (dispatch)=>
  {
    

    email()
    .then(r=>{profileData.email=r.email})
    .catch(r => alert(`"${r.message}" when fetching email`) )

    .then(r=>zipcode())
    .then(r=>{profileData.zipcode=r.zipcode})
    .catch(r => alert(`"${r.message}" when fetching zipcode`) )

    .then(r=>dob())
    .then(r=>{profileData.dob=r.dob})
    .catch(r => alert(`"${r.message}" when fetching date of birth`) ) 

    
    .then(r=>{
              dispatch({type:"PROFILE_PAGE",payload:profileData})
            })
  }


   /*return{
    type: "PROFILE_PAGE",
    paylaod:""
   } */
};


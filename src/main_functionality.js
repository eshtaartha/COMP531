
//import React from "react";
/*export function goToProfile() //function to redirect to profile page
{
    window.location.href='profile.html'; // redirect to main page
}

export function goToLanding() // function to redirect to landing(main) page
{
    window.location.href='index.html'; // redirect to landing page
}*/


export const updateStatus=function() //function to update status
{
    var newStatus=document.getElementById("status_update_input").value;
    document.getElementById("status").innerHTML = newStatus;
    //alert("Update Happening");

   return{
    type: "STATUS_UPDATED",
    paylaod:"Hello"
   }
};






import React from "react";

import Landing from "./landing/Landing"
import Main from "./main/Main"
import Profile from "./profile/Profile"

import {Link} from "react-router";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux' 



export const Layout = function({view})
{
  
    if(view=="LANDING_PAGE")
      return <Landing/>
    else if (view=="MAIN_PAGE")
      return <Main/>
    else if (view=="PROFILE_PAGE")
      return <Profile/>
    
}



export default connect(
  (state)=>
  {
    console.log(state)
    return{
      view:state.view.location
    }
  })(Layout);

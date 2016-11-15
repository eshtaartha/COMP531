import React from "react";

import Landing from "./Landing"
import Main from "./Main"
import Profile from "./Profile"

import {Link} from "react-router";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux' 


// react component to wrap all components

export const Layout = function({view})
{
  //const MAIN_PAGE,LANDING;

      /*render() 
      {
        if(this.props.view=="LANDING_PAGE")
         {
          return(
              <html>
                <head>

                  <title> Study Buddy</title>

                  <link rel="stylesheet" type="text/css" href="style.css"/>
              </head>
              
              <body>

                <div>
                <img src="http://s26.postimg.org/a2rkibyfd/whovian.png" alt="Avatar" width="100%" height="5%" id="img1"/>
                </div>

                <div>
                  //{this.props.view}
                </div>  

              </body>
             </html>
              
       
        
      }
    );
    }*/


    if(view=="LANDING_PAGE")
      return <Landing/>
    else if (view=="MAIN_PAGE")
      return <Main/>
    else if (view=="PROFILE_PAGE")
      return <Profile/>
    
}

/*function matchDispatchToProps(dispatch)
{
  return bindActionCreators({},dispatch)
}

function mapStateToProps(myState)
{
  return{
    view:myState.view

  };
}*/

export default connect(
  (state)=>
  {
    console.log(state)
    return{
      view:state.view.location
    }
  })(Layout);

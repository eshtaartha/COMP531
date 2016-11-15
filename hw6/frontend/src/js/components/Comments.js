

/*import React from "react";

import {Link} from "react-router";

import {bindActionCreators} from 'redux'

import {connect} from 'react-redux' 

//import {updateStatus} from "../../main_functionality.js";
//import {goToProfile} from "../../goToProfile.js";
//import {postArticle} from "../../main_functionality.js"
//import {uploadUserAvatar} from "../../main_functionality.js"
//import {postArticle} from "../../main_functionality.js"


//import {logoutUser,getData} from "../../fetchDataAction.js";




export class Comments extends React.Component
{

  
    render() {

      var children = React.Children.map(
        this.props.children,
        function(child) 
        {
          return (<p>{child}</p>);
        }
      );

      return <ul>{children}</ul>;

    }
}

/*function matchDispatchToProps(dispatch) //function to bind props with actions
{
  return bindActionCreators({updateStatus:updateStatus, 
                            logout:logoutUser, 
                            goToProfile:goToProfile,
                            getData:getData,
                            uploadUserAvatar:uploadUserAvatar,
                            postArticle:postArticle},dispatch)
}

function mapStateToProps(myState) // function to bind props with state
{
  return{
   
    /*profilePic:myState.view.data.avatar,
    username:myState.view.data.username,
    status:myState.view.data.headline,
    sideBarData0:myState.view.data.sidebarData[0],
    sideBarData1:myState.view.data.sidebarData[1],
    sideBarPics0:myState.view.data.sidebarPics[0],
    sideBarPics1:myState.view.data.sidebarPics[1],
    article1:myState.view.data.avatar,
    comments:myState.view.data.articles

  };
}

export default connect(mapStateToProps,matchDispatchToProps)(Main);*/

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'



const Comments = ({userComments}) => (
   
   <div>  
   
    {userComments.map((comment) => 
      (
        <div>
           <strong>{comment.author} commented on {comment.date}</strong>
           <p>{comment.text}</p>    
        </div>
    ))}
      
  </div> 

)

export default Comments












import React from "react";

import {Link} from "react-router";

import {bindActionCreators} from 'redux'

import {connect} from 'react-redux' 

import {updateStatus} from "../../main_functionality.js";
import {goToProfile} from "../../goToProfile.js";

import {logoutUser,getData} from "../../fetchDataAction.js";


export class Main extends React.Component
{

  
    render() {
        return (


        
<div>  

<div>
    <img src="http://s26.postimg.org/a2rkibyfd/whovian.png" alt="Avatar" width="100%" height="5%" id="img1"/>
</div>

 <div>

 

 <div className="homeButtonDiv">
   <input type="submit" className="homeButton" value="Profile" onClick={this.props.goToProfile}/>
   <p></p>
    <input type="submit" className="homeButton" value="Logout" onClick={this.props.logout} />
   <p></p>
 </div>

 <div className="mainPic">

  <div className="mainPic">
    <img src={this.props.profilePic} alt="Avatar" width="300px" height="200px%" id="img1"/>
  </div>

  <div className="mainName">
    <label className="mainNameFont"> {this.props.username} </label>
  </div>


  <br/><br/>

  <div className="mainStatus">
    <label className="status" id="status">{this.props.status}</label>
  </div>

 </div>

</div>

<div>

<p></p>

<div className="shareYourThoughts">

<label className="statusUpdateMsg">Update Status:</label><br/>
<input type="text" name="status_update" id="status_update_input" className="status_update_input"/>
<input className="statusUpdateButton" value="Update" onClick={this.props.updateStatus}/>


</div>

<p></p>

<div className="shareYourThoughts">

<form>
<label className="statusUpdateMsg">Post Something:</label> <p></p>
<input type="file" className="statusPicUpdate"/>
<textarea rows="4" cols="160" className="txtArea"></textarea><p></p>
<button type="submit" value="Post" className="postClear">Post</button>
<button type="reset" value="clear" className="postClear">Clear</button>
</form>

</div>

<div className="searchBox">
<input type="text" name="searchBox" id="searchBox" className="searchBoxInput" placeholder="Search articles here"/>
</div>

       <div className="cardContainer">
       
       <div className="followedCards">
       <img src={this.props.sideBarPics0.avatar} alt="Avatar" width="100px" height="200px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> {this.props.sideBarPics0.username}</p>
       <p className="cardFont"> {this.props.sideBarData0.headline}</p>
       
       <input type="button" className="followedButton" value="Unfollow" />

       </div> 
       </div>

       <div className="mainCards">
       <img src="https://s-media-cache-ak0.pinimg.com/564x/60/3d/3e/603d3e4faaeec317a9c33567c424bbef.jpg" alt="Avatar" width="500px" height="500px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> Picture 1</p>
       
       <input type="button" className="cardButton" value="Edit" />
       <input type="button" className="cardButton" value="Comment" />

       </div> 
       </div>
       
       <div className="mainCards">
       
       <div className="container">
 
       <b><p> "To thine own self be true, and it must follow, as the night the day, thou canst not then be false to any man"</p></b>
       <b><p> - William Shakespeare</p></b>
       
       <input type="button" className="cardButton" value="Edit" />
       <input type="button" className="cardButton" value="Comment" />
       
       </div> 
       </div>
       
       
       <div className="clearIt"></div>
       
       
       <div className="followedCards">
       <img src={this.props.sideBarPics1.avatar} alt="Avatar" width="100px" height="200px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> {this.props.sideBarPics1.username}</p>
       <p className="cardFont"> {this.props.sideBarPics1.headline}</p>
       
       <input type="button" className="followedButton" value="Unfollow" />

       </div> 
       </div>
       

       <div className="mainCards">
     
       <div className="container">
 
       <b><p> "Be not afraid of greatness: some are born great, some achieve greatness, and some have greatness thrust upon them"</p></b>
       <b><p> - William Shakespeare</p></b>
       
       <input type="button" className="cardButton" value="Edit" />
       <input type="button" className="cardButton" value="Comment" />

       </div> 
       </div>
       
       <div className="mainCards">
       <img src="https://c2.staticflickr.com/8/7382/9021260475_915efac23d_z.jpg" alt="Avatar" width="500px" height="500px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> Picture 2</p>
       
       <input type="button" className="cardButton" value="Edit" />
       <input type="button" className="cardButton" value="Comment" />

       </div> 
       </div>
       
       
       <div className="clearIt"></div>
       
       
       
       
       <div className="followedCards">
       <img src={this.props.sideBarPics0.avatar} alt="Avatar" width="100px" height="200px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> {this.props.sideBarPics0.username}</p>
       <p className="cardFont"> {this.props.sideBarPics0.headline}</p>
       
       <input type="button" className="followedButton" value="Unfollow" />

       </div> 
       </div>
       
       <div className="mainCards">
       <img src="http://www.designswan.com/wp-content/uploads/2009/Photo/China/5.jpg" alt="Avatar" width="500px" height="500px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> Picture 3</p>
       
       <input type="button" className="cardButton" value="Edit" />
       <input type="button" className="cardButton" value="Comment" />

       </div> 
       </div>
       
       <div className="mainCards">
       
       <div className="container">
 
       <b><p> "Doubt that the sun doth move, doubt truth to be a liar, but never doubt I love"</p></b>
       <b><p> - William Shakespeare</p></b>
       
       <input type="button" className="cardButton" value="Edit" />
       <input type="button" className="cardButton" value="Comment" />
       
       </div> 
       </div>
       
       
       <div className="clearIt"></div>
       

       <div className="followedCards">
       <img src={this.props.sideBarPics1.avatar} alt="Avatar" width="100px" height="200px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> {this.props.sideBarPics1.username}</p>
       <p className="cardFont"> {this.props.sideBarPics1.headline} </p>
       
       <input type="button" className="followedButton" value="Unfollow" />
       
      
       </div> 
       
       <div className="addUser">
       
       <textarea rows="2" cols="8" className="txtArea" placeholder="Add User"></textarea><p></p>
       <input type="button" className="followedButton" value="Add user" />
       
       </div>
       
       </div>
       
       <div className="mainCards">
       
       <div className="container">
 
       <b><p> "There is nothing either good or bad, but thinking makes it so."</p></b>
       <b><p> - William Shakespeare</p></b>
       
       <input type="button" className="cardButton" value="Edit" />
       <input type="button" className="cardButton" value="Comment" />
       
       </div> 
       </div>
       
       <div className="mainCards">
       <img src="http://66.media.tumblr.com/e42a1e9fb3a38ebc627dee33bf8ffb37/tumblr_o412lc7WUx1qiqfg2o1_500.jpg" alt="Avatar" width="500px" height="500px" id="img1"/>
       <div className="container">
 
       <p className="cardFont"> Picture 4</p>
       
       <input type="button" className="cardButton" value="Edit" /> 
       <input type="button" className="cardButton" value="Comment" />

       </div> 
       </div>
       
       </div>
       


</div>
</div>

          );
    }
}

function matchDispatchToProps(dispatch) //function to bind props with actions
{
  return bindActionCreators({updateStatus:updateStatus, logout:logoutUser, goToProfile:goToProfile,getData:getData},dispatch)
}

function mapStateToProps(myState) // function to bind props with state
{
  return{
   
    profilePic:myState.view.data.avatar,
    username:myState.view.data.username,
    status:myState.view.data.headline,
    sideBarData0:myState.view.data.sidebarData[0],
    sideBarData1:myState.view.data.sidebarData[1],
    sideBarPics0:myState.view.data.sidebarPics[0],
    sideBarPics1:myState.view.data.sidebarPics[1],
    article1:myState.view.data.avatar

  };
}

export default connect(mapStateToProps,matchDispatchToProps)(Main);

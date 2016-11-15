import React from "react";

import {Link} from "react-router";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux' 

import {goHome} from "../../goHome.js"

import {uploadUserAvatarProfile, updateProfile} from "../../main_functionality.js"


export class Profile extends React.Component
{

  
 render()
 {
  return(
            
<div>


<div>

<br/>

<div className="homeButtonDiv">
<input type="submit" className="homeButton" value="Home" id="home" onClick={this.props.goHome}/>
</div> <br/>

</div>


<div className="profile">

<p></p>



<div>

  <div className="profile_left_column">
  
  <div className="profilePic">
  <img src={this.props.profilePic} alt="Avatar" width="100%" height="100%" id="img1"/>


  <input type="file" onChange={(e)=>this.props.uploadUserAvatarProfile(e)} className="profilePicUpdate" accept="image/*" />
  
  </div>
  
  
  
  <br/><br/>
 
  <label id="name" className="profile_font_left">{this.props.username}</label>
  <p> </p>
  <label id="email" className="profile_font_left">{this.props.email}</label>
  <p> </p>
  <label id="tele" className="profile_font_left"></label>
  <p> </p>
  <label id="zip" className="profile_font_left">{this.props.zipcode}</label>
  <p> </p>
  <label id="dob" className="profile_font_left"></label>
  <p> </p>
  

  </div>


  <div className="profile_right_column">
  
  <label className="profile_font_left"> Wanna update profile info?</label><br/>
  <label className="profile_font_left"> You can do it here...</label> <br/><br/>
  
  
  <label for="name_input" className="profile_font_right">Display Name (Note: Should not start with number)</label>
  <input type="text" className="profile_input" id="name_input"/><br/><br/>
  
  <label for="email_input" className="profile_font_right">Email address (Form/at: xxxx@xxx.xxx)</label> 
  <input type="email" className="profile_input" id="email_input"/><br/><br/>
  
  <label for="tel_input" className="profile_font_right">Phone number (Format: ##########)</label>
  <input type="tel" pattern="\d{1,2}/\d{1,2}/\d{4}" className="profile_input" id="tel_input"/> <br/><br/>
  
  <label for="zip_input" className="profile_font_right">Zip Code (Format: #####)</label>
  <input type="text" className="profile_input" id="zip_input"/><br/><br/>
  
  <label for="pwd_input" className="profile_font_right">Password:</label><br/>
  <input type="password" className="profile_input" id="pwd_input"/><br/><br/>
  
  <label for="pwd_confirm_input" className="profile_font_right">Confirm Passowrd:</label>
  <input type="password" className="profile_input" id="pwd_confirm_input"/> <br/><br/><br/>
  
  <input type="submit" className="updateButton" value="Update" id="update" onClick={()=>{this.props.updateProfile(this.props.email, this.props.zipcode)}}/>

  </div>
</div>


</div>





</div>

          );
 }

}

function matchDispatchToProps(dispatch)
{
  return bindActionCreators({goHome:goHome, uploadUserAvatarProfile: uploadUserAvatarProfile, updateProfile:updateProfile},dispatch)
}

function mapStateToProps(myState)
{
  return{
          profilePic:myState.view.avatar,
          username:myState.view.username,
          email:myState.view.email,
          zipcode:myState.view.zipcode,
          dob:myState.view.dob

        };
}

export default connect(mapStateToProps,matchDispatchToProps)(Profile);
import React from "react";

import {Link} from "react-router";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux' 

import {authenticateLogin} from "../../fetchDataAction.js";

import {registerUser} from "../main/main_functionality.js"


export class Landing extends React.Component
{

	goToMain()
	{
     const view = "MAIN_PAGE";
     this.props.changeView(view);
	}
	
 render()
 {
 	return(
            


<div >

<div>
    <img src="http://s26.postimg.org/a2rkibyfd/whovian.png" alt="Avatar" width="100%" height="5%" id="img1"/>
 </div>

<div className="login">

<p className="login"> User Name </p>
<input type="text" name="login_name" id="login_name" className="login_input"/> 

<p className="login">   Password </p>
<input type="password" name="password" id="login_password" className="login_input"/>

<input type="submit" value="Login"  className="loginButton" onClick={this.props.changeView}/> <br/>

</div>

<p></p> <br/> <br/>

<div>

<div className="signUpLeft">
<img src="http://s26.postimg.org/mvfoi9a15/whovian_landing.png" alt="Avatar" id="img1" width="100%" height="150%"/>
</div>

<div className="signUp">

<form name="registration_form">

<p className="regWelcome"> Haven't registered yet? You're missing out! </p> 

<br/><br/><br/>
<p className="reg">User Name(Should start with characters only)*</p><br/>
<input type="text" name="account_name" id="account_name" required="required" className="reg_input"/><br/><br/>

<p className="reg">Display Name(optional)<br/></p>
<input type="text" name="display_name" className="reg_input"/><br/><br/>


<p className="reg">Email address(Format: ...xxxxx@xxxx..) *</p><br/>
<input type="email" id="email_address" name="email_address" required="required" className="reg_input"/><br/><br/>

<p className="reg">Phone number(Format:### - ### - ####) *</p><br/>
<input type="tel" id="phone_number" pattern='\d{3}[\-]\d{3}[\-]\d{4}' name="customer_tel" required="required" className="reg_input"/><br/><br/>

<p className="reg">Date of Birth(Format:mm/dd/yyyy) *</p><br/>
<input type="text" pattern="\d{1,2}/\d{1,2}/\d{4}" name="date_of_birth" id="dob" required="required" className="reg_input"/><br/><br/>

<p className="reg">Zip Code (Format: #####) *</p><br/>
<input type="text" name="zip_code" id="zip" pattern="[0-9]{5}" title="Four digit zip code" required="required" className="reg_input"/><br/><br/>

<p className="reg">Password: *</p><br/>
<input name="password" required="required" type="password" id="password" className="reg_input"/><br/><br/>

<p className="reg">Confirm Password:( Both passwords should match) *</p> <br/>
<input name="password_confirm" required="required" type="password" id="password_confirm" oninput="check_password(this)" className="reg_input"/><br/><br/>

<p className="reg" > All fields with * are mandatory</p>

<input type="hidden" name="time_stamp" id="time_stamp"/> <br/><br/><br/>



<div className="regButtonDiv">
<input type="submit" value="Register" onClick={this.props.registerUser} className="regButton"/>
</div>

</form>

</div>

</div>



</div>

          );
 }

}

function matchDispatchToProps(dispatch)
{
  return bindActionCreators({changeView:authenticateLogin, registerUser:registerUser},dispatch)
}

function mapStateToProps(myState)
{
  return{

  };
}

export default connect(mapStateToProps,matchDispatchToProps)(Landing);
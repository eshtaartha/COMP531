

import React from "react";

import {Link} from "react-router";

import {bindActionCreators} from 'redux'

import {connect} from 'react-redux' 

import {updateStatus, sortArticles} from "./main_functionality.js";
import {goToProfile} from "./goToProfile.js";
import {postArticle} from "./main_functionality.js"
import {uploadUserAvatar} from "./main_functionality.js"
import {showComment,addComment,divClicked, editableTextBlurred, divClickedComment} from "./main_functionality.js"


import Comments from "./Comments"

import {logoutUser,addFollowing,deleteFollowing} from "../../fetchDataAction.js";

var myImage;

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

  <input type="file" onChange={(e)=>this.props.uploadUserAvatar(e)} className="statusPicUpdate" accept="image/*" />

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

<textarea rows="4" cols="140" className="txtArea" id="txtArea" placeholder="New article text"></textarea><p></p>


<input type="file" onChange={(e)=>myImage=e.target.files[0]} className="statusPicUpdate2" accept="image/*" /><p></p>
<input value="Post" className="postClear" onClick = {()=>this.props.postArticle(myImage)} />
<button type="reset" value="clear" className="postClear">Clear</button>
</form>

</div>

<div className="searchBox">
  <input type="text" name="searchBox" id="searchBox" className="searchBoxInput" placeholder="Search articles here" onBlur={this.props.sortArticles}/>
</div>

    <div className="allContainer">
       <div className="followerContainer">

            {this.props.sideBarData.map((data)=>
              (
                 <div className="followedCards">
                 <img src={data.avatar} alt="Avatar" width="100px" height="200px" id="img1"/>
                 <div className="container">
           
                 <p className="cardFont"> {data.username}</p>
                 <p className="cardFont"> {data.headline}</p>
                 
                 <input type="button" className="followedButton" value="Unfollow" onClick={()=>this.props.deleteFollowing(data.username)}/>

                 </div> 
                 </div>
              )
            )
          }

                 <div className="addUser">
                 
                 <textarea rows="2" cols="8" className="txtArea" id="addFollowingText" placeholder="Add User"></textarea><p></p>
                 <input type="button" className="followedButton" value="Add user" onClick={this.props.addFollowing} />
                 
                 </div>   
           
       </div>



       <div className="cardContainer">
          {console.log(this.props.articles)}
          {this.props.articles.map((article)=>
              (
                 <div className="mainCards">
                 <h3>{article.author} said on {article.date}</h3>
                 <img src={article.img} id="img1"/>
                 
                 <div className="container">
           
                 <p className="cardFont"> Picture ID:{article._id}</p>

                 <div name = {article._id} onClick={()=>this.props.divClicked(article._id, article.author, this.props.username,1)} onBlur={()=>this.props.divClicked(article._id, article.author, this.props.username, 2)}> {article.text}</div>

                 

                 


                 </div> 

                 <div className = "comments">
                    {article.commentShow? <Comments userComments = {article}/> : null}
                 </div>

                 <div> 
                  <p name = {article._id} className = "modifyWarning">You are not allowed to modify articles/comments</p> 
                 </div>

                 <p></p>
                 <input type="text" id = {article._id} className="commentBoxInput" placeholder="Add comments here"/> <p></p>
                 <input type="button" className="cardButton" value="Add Comment" onClick = {()=>this.props.addComment(article._id)}/>
                 <input type="button" className="cardButton" value="View Comments" onClick = {()=>this.props.showComment(article._id)}/>

                 </div>
              )
            )
          }


       </div>

    </div>
       


</div>
</div>

          );
    }
}

function matchDispatchToProps(dispatch) //function to bind props with actions
{
  return bindActionCreators({updateStatus:updateStatus, 
                            logout:logoutUser, 
                            goToProfile:goToProfile,
                            uploadUserAvatar:uploadUserAvatar,
                            postArticle:postArticle,
                            showComment:showComment,
                            addFollowing:addFollowing,
                            deleteFollowing:deleteFollowing,
                            sortArticles:sortArticles,
                            addComment:addComment,
                            divClicked:divClicked
                            },dispatch)
}

function mapStateToProps(myState) // function to bind props with state
{
  return{
   
    profilePic:myState.view.avatar,
    username:myState.view.username,
    status:myState.view.headline,
    articles:myState.view.articles,
    sideBarData:myState.view.sidebar

  };
}

export default connect(mapStateToProps,matchDispatchToProps)(Main);
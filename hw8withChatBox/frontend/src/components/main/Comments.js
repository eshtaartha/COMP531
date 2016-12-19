import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router";


const Comments = ({userComments}) => (
   
   <div>  
   
    {userComments.comments.map((comment) => 
      (
        <div>
           <strong>{comment.author} commented on {comment.date}</strong>
           <p>{comment.text}</p>    
        </div>
    ))}
      
  </div> 

)

export default Comments










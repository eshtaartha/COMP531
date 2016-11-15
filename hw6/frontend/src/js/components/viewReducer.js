import Landing from "./Landing"
import Main from "./Main"
import Profile from "./Profile"

import {goToProfile} from "../../goToProfile.js";

const initState = 
{
	articles:[],
	avatar:"",
	location:"LANDING_PAGE",
	headline:"",
	username:"",
	sidebar:[],
	email:"",
	zipcode:"",
	dob:"",
	data:{
			articles:[],
			avatar:"",
			headline:"",
			sidebar:[],
			username:"",
		 }	
}


//export default function(state={location:"LANDING_PAGE", articles:[], avatar: ""},action)
export default function(state=initState,action)
{
		
		if(action.type=="MAIN_PAGE")
		 state={...state,location:"MAIN_PAGE"}
		else if(action.type=="PROFILE_PAGE")
		 state={...state, email:action.payload.email, zipcode:action.payload.zipcode, dob:action.payload.dob, location:"PROFILE_PAGE"}
		else if(action.type=="LANDING_PAGE")
		 state={...state,location:"LANDING_PAGE"}
		else if(action.type=="DATA_FETCHED")
		 state ={...state,articles:action.payload.articles, 
		 			avatar:action.payload.avatar, 
		 			headline:action.payload.headline,
		 			username:action.payload.username,
			 		sidebar:action.payload.sidebar,
			 		location:"MAIN_PAGE"}
		 		
		else if(action.type=="STATUS_UPDATED")
		 state={...state,headline:action.payload}
		else if(action.type=="TOGGLE_COMMENT_ON")
			   {
				 var articleChanged = state.articles.map((article) => 
				 	{
					 	if(article._id == action.payload)
					 	{
					 		return {...article,commentShow:true}
					 	}
					 	else
					 	{
					 		return article
					 	}

				 	}
				 	)
				 state = {...state,articles:articleChanged}
				}

		else if(action.type=="TOGGLE_COMMENT_OFF")
			   {
				 var articleChanged = state.articles.map((article) => 
				 	{
					 	if(article._id == action.payload)
					 	{
					 		return {...article,commentShow:false}
					 	}
					 	else
					 	{
					 		return article
					 	}

				 	}
				 	)
				 state = {...state,articles:articleChanged}
				}
		else if(action.type=="ARTICLE_POSTED")
				{
					state={...state, articles : [{...action.payload[0],displayComment : false},...state["articles"]], location:"MAIN_PAGE"}
				}
		else if(action.type=="MAIN_AVATAR_UPDATED")
				{
					state={...state, avatar: action.payload, location:"MAIN_PAGE"}
				}
		else if(action.type=="PROFILE_AVATAR_UPDATED")
				{
					state={...state, avatar: action.payload, location:"PROFILE_PAGE"}
				}
		else if(action.type=="PROFILE_UPDATED")
				{   
					//goToProfile();
					state={...state, email:action.payload.email, zipcode:action.payload.zip, location:"PROFILE_PAGE"}
				}
		else if(action.type=="NEW_USER_REGISTERED")
				{   
					
					state={...state, location:"LANDING_PAGE"}
				}
		else if(action.type=="FOLLOWING_ADDED")
				{   
					
					state={...state, sidebar:action.payload, location:"MAIN_PAGE"}
				}
		else if(action.type=="FOLLOWING_DELETED")
				{   
					
					state={...state, sidebar:action.payload, location:"MAIN_PAGE"}
				}

   

   return state;
	
}
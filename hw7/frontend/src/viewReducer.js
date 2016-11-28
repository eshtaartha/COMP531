import Landing from "./components/landing/Landing"
import Main from "./components/main/Main"
import Profile from "./components/profile/Profile"

import {goToProfile} from "./components/main/goToProfile.js";

const initState = 
{
	articles:[],
	articlesStore:[],
	avatar:"",
	location:"LANDING_PAGE",
	temp:"",
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
		 			articlesStore:action.payload.articles,
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
					state={...state, articles : [{...action.payload[0],displayComment : false},...state["articles"]], 
						   articlesStore:[{...action.payload[0],displayComment : false},...state["articlesStore"]], location:"MAIN_PAGE"}
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
					
					state={...state, email:action.payload.email, zipcode:action.payload.zip, location:"PROFILE_PAGE"}
				}
		else if(action.type=="NEW_USER_REGISTERED")
				{   
					
					state={...state, location:"LANDING_PAGE"}
				}
		else if(action.type=="FOLLOWING_ADDED")
				{   
					
					
					var sidebarChanged = action.payload.map((data) => 
				 	{
					 	
						return {...data}
				 	}
				 	)

					state={...state, sidebar: sidebarChanged, location:"MAIN_PAGE"}
					
				}
		else if(action.type=="FOLLOWING_DELETED")
				{   

					var sidebarChanged2 = action.payload.map((data) => 
				 	{
					 	
						return {...data}
				 	}
				 	)

					state={...state, sidebar: sidebarChanged2, location:"MAIN_PAGE"}
					
					
				}
		else if(action.type=="ARTICLES_SORTED")
				{   

					var sortedArticles = [];

					console.log(state.articles)
					console.log(action.payload)

					state.articlesStore.map((data) => 
				 	{
					 	if(!(data.author.search(action.payload)))//||(data.text.search(action.payload)))
						{
							sortedArticles.push(data);
						}
				 	}
				 	)
					
					console.log(sortedArticles)
					state={...state, articles: sortedArticles, location:"MAIN_PAGE"}
					
					
				}
		else if(action.type=="COMMENT_ADDED")
				{
					console.log(action.payload);

					var commentChanged = state.articles.map((article) => 
				 	{
				 		console.log(action.payload.articles[0]._id)
					 	if(article._id == action.payload.articles[0]._id)
					 	{   
					 		
					 		action.payload.articles[0].commentShow = true;
					 		alert('comment found')
					 		return action.payload.articles[0]
					 	}
					 	else
					 	{
					 		return {...article}
					 	}

				 	}
				 	)
				 	state = {...state,articles:commentChanged, articlesStore: commentChanged}
				}
		else if(action.type=="ARTICLE_MODIFIED")
				{
					console.log("article modified");

					var articleChanged = state.articles.map((article) => 
				 	{
				 		console.log(action.payload.articles[0]._id)

					 	if(article._id == action.payload.articles[0]._id)
					 	{   
					 		
					 		
					 		alert('article found')
					 		return action.payload.articles[0]
					 	}
					 	else
					 	{
					 		return {...article}
					 	}

				 	}
				 	)

					
				 	state = {...state,articles:articleChanged, articlesStore: articleChanged}
				}
		else if(action.type=="ARTICLE_AUTH_CHECK")
				{
					console.log("article auth checked");
				
				 	state = {...state}
				}


   

   return state;
	
}
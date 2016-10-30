import Landing from "./Landing"
import Main from "./Main"
import Profile from "./Profile"


export default function(state={location:"LANDING_PAGE"},action)
{
		
		if(action.type=="MAIN_PAGE")
		 state={...state,location:"MAIN_PAGE"}
		else if(action.type=="PROFILE_PAGE")
		 state={...state,location:"PROFILE_PAGE"}
		else if(action.type=="LANDING_PAGE")
		 state={...state,location:"LANDING_PAGE"}
		else if(action.type=="DATA_FETCHED")
		 state={...state,data:action.payload,location:"MAIN_PAGE"}
		else if(action.type=="STATUS_UPDATED")
		 state={...state,headline:action.payload}

		


   return state;
	
}

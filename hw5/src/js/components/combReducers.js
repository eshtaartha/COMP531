import {combineReducers} from 'redux'

//import articleReducer from './articleReducer'
//import profileReducer from './profileReducer'
import viewReducer from './viewReducer'
//import fetchDataReducer from './fetchDataReducer'
//import statusUpdateReducer from './statusUpdateReducer'

// reducer used to combine all reducers

const allReducers=combineReducers({

	//articles:articleReducer,
	//profiles:profileReducer,
	view:viewReducer
	//fetchData:fetchDataReducer
	//newStatus:statusUpdateReducer
});

export default allReducers;

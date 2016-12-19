import {combineReducers} from 'redux'

import viewReducer from './viewReducer'


const allReducers=combineReducers({

	view:viewReducer
	
});

export default allReducers;


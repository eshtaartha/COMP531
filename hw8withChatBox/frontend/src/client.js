import React from "react";
import ReactDOM from "react-dom";

import {Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout"

import Landing from "./components/landing/Landing"
import Main from "./components/main/Main"
import Profile from "./components/profile/Profile"

import {createStore,applyMiddleware} from 'redux'

import combReducers from './combReducers'

import promise from "redux-promise-middleware"

import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)
const myStore=createStore(combReducers,middleware); //create store and initialize middleware

import {Provider} from 'react-redux'

myStore.subscribe(()=>{console.log("The state changed to",myStore.getState())})

const app = document.getElementById('app');

ReactDOM.render( //render components
	<Provider store={myStore}>
	 <Layout/>
	</Provider>,
	app);


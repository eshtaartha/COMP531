/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {

		  fetch(url, {
		  method: "POST",
		  body: JSON.stringify(data),
		  headers: {
		    "Content-Type": "application/json"
		  },
		  credentials: "same-origin"
		  })
		  .then(r =>{
		  	expect(res.status).to.eql(200)
		  	return res.text()
		  })
		  .then(body =>{
		  	expect(body).to.eql("Hello")
		  })

		//done(new Error('Not implemented'))
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		done(new Error('Not implemented'))
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		done(new Error('Not implemented'))
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		done(new Error('Not implemented'))
	}, 200)

});

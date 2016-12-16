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

		
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		
		done(new Error('Not implemented'))
 	}, 200)

	it('should return an article with a specified id', (done) => {
		
		done(new Error('Not implemented'))
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		
		done(new Error('Not implemented'))
	}, 200)

});

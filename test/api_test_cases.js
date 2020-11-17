/*

The following are unit test cases using Mocha and Chai
to validate the functionality of the endpoint we created 
under variaous circumstances

Tech Stack:
- Javascript

Author: Daniel Goncalves

 */

// Importing of necessary modules
var expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
const fs = require('fs')
const should = require('should');
const appendix_1 = require('./appendix_1_input.json')
const appendix_2 = require('./appendix_2_output.json')
const  app = require('../app');

// Setting up Chai to simulate HTTP requests
chai.use(chaiHttp);

// Starting server
app.start();

/*
   Test Case 1 : Check to see if JSON is valid
*/
describe('1. Invalid JSON Test Case', () => {
    it('API should return an error message, telling user that JSON is invalid', (done) => {

        let invalid_json = "{'fake_json':-"

        chai.request("http://localhost:3000")
            .post('/match_the_children')
            .send(invalid_json)
            .end((err, res) => {
                should(res.body).have.a.Object;
                should(res.body).have.a.property('statusCode')
                should(res.body).have.a.property('error')
                should(res.body).have.a.property('message')
                done();
            });
    });
});

/*
   Test Case 2 : Check to see if Appendix 1 JSON returns desired Appendix 2 JSON
*/
describe('2. Test valid JSON input for desired output', () => {
    it('API should return a response like that of Appendix 2', (done) => {

        chai.request("http://localhost:3000")
            .post('/match_the_children')
            .send(appendix_1)
            .end((err, res) => {
                should(res.body).have.a.Array;
                expect(appendix_2).to.deep.equal(res.body);
                done();
            });
    });
});

/*
   Test Case 3 : Check to see if an input with no children will return the same when processed
*/
describe('3. Test input with no children only parents', () => {
    it('API should return the only parent nodes and no children', (done) => {

        chai.request("http://localhost:3000")
            .post('/match_the_children')
            .send(appendix_1)
            .end((err, res) => {
                should(res.body).have.a.Array;
                expect(appendix_2).to.deep.equal(res.body);
                done();
            });
    });
});

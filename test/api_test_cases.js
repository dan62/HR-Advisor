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
const  app = require('../app');

// Importing of testing json files
const appendix_1 = require('./desired_input_output/appendix_1_input.json')
const appendix_2 = require('./desired_input_output/appendix_2_output.json')
const multiple_trees_input = require('./multiple_trees_test/multiple_trees_input_test.json')
const multiple_trees_output = require('./multiple_trees_test/multiple_trees_output.json')
const trees_no_children_input = require('./trees_with_no_children_test/trees_no_children_input.json')
const trees_no_children_output = require('./trees_with_no_children_test/trees_no_children_output.json')


// Setting up Chai to simulate HTTP requests
chai.use(chaiHttp);

// Starting server
app.start();

/*
   Test Case 1 : Check to see if JSON is valid
*/
describe('1. Invalid JSON Test Case', () => {
    it('API should return an error message, telling user that JSON is invalid', (done) => {

        let invalid_json = "fake_json':-"

        chai.request("http://localhost:3000")
            .post('/match_the_children')
            .send(invalid_json)
            .type('json')
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
   Test Case 3 : Check to see if multiple trees can be processed
*/
describe('3. Test input with multiple trees present', () => {
    it('API should return multiple trees present', (done) => {

        chai.request("http://localhost:3000")
            .post('/match_the_children')
            .send(multiple_trees_input)
            .end((err, res) => {
                should(res.body).have.a.Array;
                expect(multiple_trees_output).to.deep.equal(res.body);
                done();
            });
    });
});

/*
   Test Case 4 : Check to see response if all the trees have no children
*/
describe('4. Test input with trees only and no children', () => {
    it('API should return trees without any children but correctly formatted', (done) => {

        chai.request("http://localhost:3000")
            .post('/match_the_children')
            .send(trees_no_children_input)
            .end((err, res) => {
                should(res.body).have.a.Array;
                expect(trees_no_children_output).to.deep.equal(res.body);
                done();
            });
    });
});

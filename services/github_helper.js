/*

The following is an API data service which interacts with Github API
to querry the desired data to populate in table

Tech Stack:
- Javascript

Author: Daniel Goncalves

 */

'use strict';
const fetch = require('node-fetch');

// Constructor
var github_helper = function () { };

// Function that queries Github for respositories containing NodeJS
github_helper.perform_q = async function () {

    let url = 'http://api.github.com/search/repositories?q=nodejs%2Blanguage%3Anodejs&sort=stars&order=desc%0A';

    // API call options
    const options = {
        method: 'POST',
        headers: {
            'user-agent': 'node.js'
        }
    };

    // API call to Github
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}

// Exporting of module
module.exports = github_helper

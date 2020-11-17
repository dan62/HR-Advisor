/*

The following is an API controller which interacts with the 
data service inorder to get the github query results

Tech Stack:
- Javascript

Author: Daniel Goncalves

 */

// importing of necessary modules
const github_helper = require('../services/github_helper');

// Function that performs search querry to locate respositories with nodejs
const search_github = async (req, h) => {
    let git_search_results = await github_helper.perform_q();
    return h.view('tables',{tables: true, data: git_search_results})
}

// Exporting of module
module.exports = {
    github_search_repo_handler: search_github
}
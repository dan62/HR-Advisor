// Importing of necessary Controllers
const githubController = require('../handlers/github_handler');
const customAPIController = require('../handlers/custom_api_handler');

// Declaration of routes
const routesArray = [

	// Route for Task 1 : matching children with parents
	{
		method: 'POST',
		path: '/match_the_children',
		handler: customAPIController.match_children_handler
	},

	// Route for Task 2 : displaying github respositories containing NodeJS in a table
	{
		method: 'GET',
		path: '/',
		handler: githubController.github_search_repo_handler
	},

	// Route to make third party UI vendor modules accessible
	{
		method: 'GET',
		path: '/vendor/{file*}',
		handler: {
			directory: {
				path: 'public/vendor',
				listing: true
			}
		}
	},

	// Route to make third party UI dist modules accessible
	{
		method: 'GET',
		path: '/dist/{file*}',
		handler: {
			directory: {
				path: 'public/dist',
				listing: true
			}
		}
	}
];

// Exporting of module
module.exports = {
	web: routesArray
}
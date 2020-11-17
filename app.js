// Importing of necessary modules
const hbs = require('hbs');
const web = require('./routes/web');
const Hapi = require('@hapi/hapi')
const server = Hapi.server({
	host: 'localhost',
	port: 3000
})

// Registering partial view data
hbs.registerPartials("./views/partials");

// Function to start the server asyncronously
const start = async () => {

	if (process.env.NODE_ENV == "production") {
		console.log = function () { };
	}

	try {
		await server.register(require('@hapi/vision'));
		await server.register(require('@hapi/inert'));

		// Registering the routes file of declared endpoints
		server.route(web.web);

		await server.views({
			engines: {
				html: require('hbs')
			},
			relativeTo: __dirname,
			path: 'views'
		});

		await server.start()
		console.log(`Server start at: ${server.info.uri}`)
	}
	catch (err) {
		console.error(err)
		process.exit(1)
	}
}

// Starting the server
start()

module.exports = server;
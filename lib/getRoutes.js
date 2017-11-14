'use strict';

const _ = require('lodash');
const Routes = require('./routes');

const getRoutes = function (app) {
	if (!app) {
		throw new Error('App is missing.');
	}

	const routes = new Routes();

	if (app.constructor.name === 'Sails') {
		// get all routes from Sails app
		Object.keys(app.config.routes).reduce((routes, endPoint) => {
			const path = endPoint.split(' ');
			if (path.length == 2) {
				// processing the verb
				routes.processEndpoint(path[0], path[1]);
			}
			else {
				// add for all method 
				routes.addToAllMethod(path[0]);
			}

			return routes;
		}, routes);
	}
	else if (app._router !== undefined && Array.isArray(app._router.stack)) {

		/* eslint-disable no-underscore-dangle */
		_.forOwn(app._router.stack, middleware => {
			if (!middleware.route) {
				return;
			}

			const method = middleware.route.stack[0].method,
				route = middleware.route.path;

			routes.processEndpoint(method, route);
		});
		/* eslint-enable no-underscore-dangle */

	}
	else {
		throw new Error('App is not supported.');
	}

	return routes.export();
};

module.exports = getRoutes;

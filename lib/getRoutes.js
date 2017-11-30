'use strict';

const _ = require('lodash');

const Routes = require('./Routes');

const isSails = function (app) {
  return app.constructor.name === 'Sails';
};

const isExpress = function (app) {
  /* eslint-disable no-underscore-dangle */
  return app._router !== undefined && Array.isArray(app._router.stack);
  /* eslint-enable no-underscore-dangle */
};

const getRoutes = function (app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  if (isSails(app)) {
    // A Sails.JS app detected.
    // Start to extract routes from Sails.js app.config .
    Object.keys(app.config.routes).forEach(endPoint => {
      const path = endPoint.split(' ');

      // Check the route verb is presented or not.
      if (path.length === 2) {
        // Process the verb and path with route class.
        Routes.processEndpoint(path[0], path[1]);
      } else {
        // If a verb not presented for the current route,
        // it mean the sails add the target route for all verbs.
        Routes.addToAllMethod(path[0]);
      }
    });
  } else if (isExpress(app)) {
    /* eslint-disable no-underscore-dangle */
    _.forOwn(app._router.stack, middleware => {
      if (!middleware.route) {
        return;
      }
      /* eslint-enable no-underscore-dangle */
      const method = middleware.route.stack[0].method,
            route = middleware.route.path;

      Routes.processEndpoint(method, route);
    });
  } else {
    throw new Error('App is not supported.');
  }

  return Routes.routes;
};

module.exports = getRoutes;

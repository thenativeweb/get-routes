'use strict';

const _ = require('lodash');

const supportedMethods = [ 'get', 'post', 'put', 'patch', 'delete' ];

const isExpress = function (app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  /* eslint-disable no-underscore-dangle */
  return app._router !== undefined && Array.isArray(app._router.stack);
  /* eslint-enable no-underscore-dangle */
};

const isSails = function (app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  return app.constructor.name === 'Sails';
};

const getRoutes = function (app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  const routes = {};

  supportedMethods.forEach(supportedMethod => {
    routes[supportedMethod] = [];
  });

  if (isSails(app)) {
    Object.keys(app.config.routes).forEach(endPoint => {
      let [ method, path ] = endPoint.split(' ');

      if (method && !path) {
        // If we have no path, this actually means that there is no method. This
        // again means that the path is valid for all methods. The path is then
        // available in the method field, so let's fix this.
        path = method;
        method = undefined;

        supportedMethods.forEach(supportedMethod => {
          routes[supportedMethod].push(path);
        });

        return;
      }

      if (!supportedMethods.includes(method)) {
        throw new Error(`Invalid method ${method}.`);
      }

      routes[method].push(path);
    });
  } else if (isExpress(app)) {
    /* eslint-disable no-underscore-dangle */
    _.forOwn(app._router.stack, middleware => {
      /* eslint-enable no-underscore-dangle */
      if (!middleware.route) {
        return;
      }

      const method = middleware.route.stack[0].method,
            path = middleware.route.path;

      if (!supportedMethods.includes(method)) {
        throw new Error(`Invalid method ${method}.`);
      }

      routes[method].push(path);
    });
  } else {
    throw new Error('Invalid application type.');
  }

  return routes;
};

module.exports = getRoutes;

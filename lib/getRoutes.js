'use strict';

const _ = require('lodash');

const getRoutes = function (app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  const routes = {};

  /* eslint-disable no-underscore-dangle */
  _.forOwn(app._router.stack, middleware => {
    if (!middleware.route) {
      return;
    }

    const method = middleware.route.stack[0].method,
          route = middleware.route.path;

    routes[method] = routes[method] || [];
    routes[method].push(route);
  });
  /* eslint-enable no-underscore-dangle */

  return routes;
};

module.exports = getRoutes;

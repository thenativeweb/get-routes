'use strict';

const _ = require('lodash');

const supportedMethods = [ 'get', 'post', 'put', 'patch', 'delete' ];
let humanReadable = true;

const extractExpressRoutes = (middleware, prePath, routes) => {
  const method = middleware.route.stack[0].method,
        path = middleware.route.path;

  if (!supportedMethods.includes(method)) {
    throw new Error(`Invalid method ${method}`);
  }

  routes[method].push((prePath + path).
  replace(/\\/g, '').
  replace(/\/\//g, '/').
  replace(/\?:\//g, ''));
};
const extractNestedExpressRouter = (stack, prePath, routes) => {
  // Load simple one
  if (!Array.isArray(stack)) {
    throw new Error('Stack is not an Array.');
  }
  stack.filter(middleware => middleware.route).forEach(middleware => {
    extractExpressRoutes(middleware, prePath, routes);
  });
  stack.filter(middleware => middleware.name === 'router').map(middleware => {
    if (humanReadable) {
      const tmp = _.cloneDeep(middleware);

      tmp.handle.stack.forEach(route => {
        route.keys.forEach(param => {
          const rawStrURL = route.regexp.toString();

          route.regexp = rawStrURL.replace('(?:([^\\/]+?))', `/:${param.name}`);
        });
      });

      return tmp;
    }

    return middleware;
  }).
  forEach(middleware => extractNestedExpressRouter(middleware.handle.stack, prePath + middleware.regexp.
  toString().
  replace('/^\\', '').
  replace('\\/?(?=\\/|$)/i', ''), routes));
};

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

const getRoutes = function (app, options) {
  if (!app) {
    throw new Error('App is missing.');
  }

  if (options) {
    Object.keys(options).forEach(optionKey => {
      switch (optionKey) { // eslint-disable-line default-case
        case 'format':
          switch (options[optionKey].toLowerCase()) {
            case 'human-readable':
              humanReadable = true;
              break;
            case 'regex':
              humanReadable = false;
              break;
            default:
              throw new Error('Invalid URL parsing format selected.supported format: \'human-readable\', \'regex\'.');
          }
          break;
        default:
          throw new Error(`Invalid Option pass to the get-routes constractor. the invalid key: '${optionKey}'.`);
      }
    });
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
    extractNestedExpressRouter(app._router.stack, '', routes); // eslint-disable-line no-underscore-dangle
  } else {
    throw new Error('Invalid application type.');
  }

  return routes;
};

module.exports = getRoutes;

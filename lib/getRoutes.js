'use strict';

const _ = require('lodash');
const { InvalidApplicationError,
    InvalidHTTPMethodError,
    GeneralError, MissedAppError,
    InvalidURLParsingFormatError,
    InvalidOptionsError } = require('./Errors');

// Module static value.
// Default supported HTTP method.
const supportedMethods = [ 'get', 'post', 'put', 'patch', 'delete' ];

// Module default config.
let humanReadable = true;

// Module private function.
/**
 * @desc Determine the passed app is an Express.js app or not.
 * @memberOf get-routes
 * @private
 * @throws MissedAppError {@link  MissedAppError}
 * @param {Object} app
 * @return {Boolean} true if passed app is an Express.js app.
 */
const isExpress = function (app) {
  if (!app) {
    throw new MissedAppError();
  }

    /* eslint-disable no-underscore-dangle */
  return app._router !== undefined && Array.isArray(app._router.stack);
    /* eslint-enable no-underscore-dangle */
};
/**
 * @desc Determine the passed app is a Sails.js app or not.
 * @memberOf get-routes
 * @private
 * @method
 * @throws MissedAppError {@link MissedAppError}
 * @param {object} app
 * @return {boolean} true if passed app is a Sails.js app.
 */
const isSails = function (app) {
  if (!app) {
    throw new MissedAppError();
  }

  return app.constructor.name === 'Sails';
};
/**
 * @desc Extract routes from middleware
 * @memberOf get-routes
 * @private
 * @throws InvalidHTTPMethodError {@link InvalidHTTPMethodError}
 * @param {Object} middleware
 * @param {String} prePath
 * @param {Routes} routes
 */
const extractRoutes = (middleware, prePath, routes) => {
  const method = middleware.route.stack[0].method,
        path = middleware.route.path;

  if (!supportedMethods.includes(method)) {
    throw new InvalidHTTPMethodError(method);
  }

  routes[method].push((prePath + path).
  replace(/\\/g, '').
  replace(/\/\//g, '/').
  replace(/\?:\//g, ''));
};
/**
 * @desc Iterate the nested middleware inside Express.js app to find Express.Router middleware recursively.
 * @memberOf get-routes
 * @private
 * @throws GeneralError {@link GeneralError}
 * @param {Array} stack
 * @param {String} prePath
 * @param {Routes} routes {@see Routes}
 */
const expressNestedRouterExtractor = (stack, prePath, routes) => {
    // Load simple one
  if (!Array.isArray(stack)) {
    throw new GeneralError('Stack is not an Array.');
  }
  stack.filter(middleware => middleware.route).forEach(middleware => {
    extractRoutes(middleware, prePath, routes);
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
  forEach(middleware => expressNestedRouterExtractor(middleware.handle.stack, prePath + middleware.regexp.
  toString().
  replace('/^\\', '').
  replace('\\/?(?=\\/|$)/i', ''), routes));
};

// Module constractor.
/**
 * @name get-routes
 * @class
 * @desc get-routes constractor
 * @throws InvalidApplicationError {@link InvalidApplicationError}
 * @throws InvalidHTTPMethodError  {@link InvalidHTTPMethodError}
 * @throws MissedAppError          {@link MissedAppError}
 * @throws InvalidURLParsingFormat {@link InvalidURLParsingFormat}
 * @throws InvalidOptionsError     {@link InvalidOptionsError}
 * @param {Object} app
 * @param {{format:string}} options get-routes options
 * @return {JSON}
 */
const getRoutes = function (app, options) {
  if (!app) {
    throw new MissedAppError();
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
              throw new InvalidURLParsingFormatError();
          }
          break;
        default:
          throw new InvalidOptionsError(optionKey);
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
                // again means that the path is valid for all methods. The path should
                // available in the method field, so let's fix this.
        path = method;
        method = undefined;

        supportedMethods.forEach(supportedMethod => {
          routes[supportedMethod].push(path);
        });

        return;
      }

      if (!supportedMethods.includes(method)) {
        throw new InvalidHTTPMethodError(method);
      }

      routes[method].push(path);
    });
  } else if (isExpress(app)) {
    expressNestedRouterExtractor(app._router.stack, '', routes); // eslint-disable-line no-underscore-dangle
  } else {
    throw new InvalidApplicationError();
  }

  return routes;
};

module.exports = getRoutes;

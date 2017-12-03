'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require('lodash');

var supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

var isExpress = function isExpress(app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  /* eslint-disable no-underscore-dangle */
  return app._router !== undefined && Array.isArray(app._router.stack);
  /* eslint-enable no-underscore-dangle */
};

var isSails = function isSails(app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  return app.constructor.name === 'Sails';
};

var getRoutes = function getRoutes(app) {
  if (!app) {
    throw new Error('App is missing.');
  }

  var routes = {};

  supportedMethods.forEach(function (supportedMethod) {
    routes[supportedMethod] = [];
  });

  if (isSails(app)) {
    Object.keys(app.config.routes).forEach(function (endPoint) {
      var _endPoint$split = endPoint.split(' '),
          _endPoint$split2 = _slicedToArray(_endPoint$split, 2),
          method = _endPoint$split2[0],
          path = _endPoint$split2[1];

      if (method && !path) {
        // If we have no path, this actually means that there is no method. This
        // again means that the path is valid for all methods. The path is then
        // available in the method field, so let's fix this.
        path = method;
        method = undefined;

        supportedMethods.forEach(function (supportedMethod) {
          routes[supportedMethod].push(path);
        });

        return;
      }

      if (!supportedMethods.includes(method)) {
        throw new Error('Invalid method ' + method + '.');
      }

      routes[method].push(path);
    });
  } else if (isExpress(app)) {
    /* eslint-disable no-underscore-dangle */
    _.forOwn(app._router.stack, function (middleware) {
      /* eslint-enable no-underscore-dangle */
      if (!middleware.route) {
        return;
      }

      var method = middleware.route.stack[0].method,
          path = middleware.route.path;

      if (!supportedMethods.includes(method)) {
        throw new Error('Invalid method ' + method + '.');
      }

      routes[method].push(path);
    });
  } else {
    throw new Error('Invalid application type.');
  }

  return routes;
};

module.exports = getRoutes;
'use strict';

const { GeneralError } = require('./Errors').GeneralError;

/**
 * @desc Supported HTTP verb is : 'get', 'post', 'put', 'patch', 'delete'
 * @static
 */
const validVerbs = [ 'get', 'post', 'put', 'patch', 'delete' ];

/**
 *
 * @class
 * @description It's a singleton class.
 * @example const Routes= require('Routes');
 */
const Routes = module.exports = (function () {
  const routes = validVerbs.reduce((producedVariable, verb) => {
    producedVariable[verb] = [];

    return producedVariable;
  }, {});

    /**
     * @lends Routes
     */
  return {
      /**
       * @desc add to Routes DB
       * @memberOf Routes
       * @throws GeneralError
       * @param {String} verb {@link validVerbs|HTTP Supported Verb}
       * @param {String} path
       */
    addTo (verb, path) {
      if (validVerbs.indexOf(verb) > -1) {
        if (routes[verb][path]) {
          throw new GeneralError('Internal Error. a duplicate path and verb added to your routes.');
        } else {
          routes[verb].push(path);
        }
      }
    },
      /**
       * @desc Add a path to all available HTTP method in Routes DB.
       * @memberOf Routes
       * @throws GeneralError
       * @param {String} path
       */
    addToAllMethod (path) {
      validVerbs.forEach(verb => {
        Routes.addTo(verb, path);
      });
    },
    get routes () {
      return routes;
    }
  };
})();

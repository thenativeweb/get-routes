'use strict';

const validVerbs = [ 'get', 'post', 'put', 'patch', 'delete' ];

const Routes = module.exports = (function () {
  const routes = validVerbs.reduce((producedVariable, verb) => {
    producedVariable[verb] = [];

    return producedVariable;
  }, {});

  return {
    addTo (verb, path) {
      if (validVerbs.indexOf(verb) > -1) {
        if (routes[verb][path]) {
          throw new Error('Internal Error. a duplicate path and verb added to your routes.');
        } else {
          routes[verb].push(path);
        }
      }
    },
    addToAllMethod (path) {
      validVerbs.forEach(verb => {
        Routes.addTo(verb, path);
      });
    },
    processEndpoint (method, path) {
      if (Array.isArray(routes[method])) {
        if (routes[method][path]) {
          throw new Error('Internal Error. a duplicate path and verb added to your routes.');
        } else {
          routes[method].push(path);
        }
      } else {
        throw new Error('Method is not correct.');
      }
    },
    get routes () {
      return routes;
    }
  };
})();

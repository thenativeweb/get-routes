'use strict';

/* eslint-disable no-underscore-dangle */
const _routes = new WeakMap();
/* eslint-enable no-underscore-dangle */
const validVerbs = [ 'get', 'post', 'put', 'patch', 'delete' ];

/* eslint-disable no-restricted-syntax */
class Routes {
    /* eslint-enable no-restricted-syntax */
  constructor () {
    _routes.set(this, validVerbs.reduce((producedVariable, verb) => {
      producedVariable[verb] = [];

      return producedVariable;
    }, {}));
  }

  addTo (verb, path) {
    if (validVerbs.indexOf(verb) > -1) {
      _routes.get(this)[verb].push(path);
    }
  }

  addToAllMethod (path) {
    const that = this;

    validVerbs.forEach(verb => {
      that.addTo(verb, path);
    });
  }

  processEndpoint (method, path) {
    if (Array.isArray(_routes.get(this)[method])) {
      _routes.get(this)[method].push(path);
    }
    /* eslint-disable brace-style */
    else {
        /* eslint-disable brace-style */
      throw new Error('Method is not correct.');
    }
  }

  get routes () {
    return _routes.get(this);
  }

}

module.exports = Routes;

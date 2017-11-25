'use strict';

const assert = require('assertthat');
const Routes = require('../../lib/Routes');

suite('routes', () => {
  let routes = null;

  setup(() => {
    routes = null;
    routes = new Routes();
  });
  test('should create route and export it correctly', done => {
    routes.addToAllMethod('/allMethodCheck');
    routes.addTo('get', '/checkGet');
    routes.addTo('post', '/checkPost');
    routes.addTo('put', '/checkPut');
    routes.addTo('delete', '/checkDelete');
    routes.addTo('patch', '/checkPatch');
    assert.that(routes.routes).is.equalTo({
      get: [
        '/allMethodCheck',
        '/checkGet'
      ],
      post: [
        '/allMethodCheck',
        '/checkPost'
      ],
      put: [
        '/allMethodCheck',
        '/checkPut'
      ],
      patch: [
        '/allMethodCheck',
        '/checkPatch'
      ],
      delete: [
        '/allMethodCheck',
        '/checkDelete'
      ]
    });

    done();
  });

  test('should create route using processEndpoint interface', done => {
    const endpointConfig = {
      get: [ '/checkGet' ],
      post: [ '/checkPost' ],
      put: [ '/checkPut' ],
      delete: [ '/checkDelete' ],
      patch: [ '/checkPatch' ]
    };

    Object.keys(endpointConfig).forEach(method => {
      endpointConfig[method].forEach(path => {
        routes.processEndpoint(method, path);
      });
    });
    assert.that(routes.routes).is.equalTo(endpointConfig);
    done();
  });
});


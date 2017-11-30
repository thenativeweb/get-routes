'use strict';

const assert = require('assertthat');

suite('routes', () => {
  let routes = null;

  setup(() => {
    routes = null;
        /* eslint-disable global-require */
    routes = require('../../lib/Routes');
        /* eslint-disable global-require */
  });
  teardown(() => {
        /* eslint-disable prefer-reflect */
    delete require.cache[require.resolve('../../lib/Routes')];
        /* eslint-enable prefer-reflect */
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


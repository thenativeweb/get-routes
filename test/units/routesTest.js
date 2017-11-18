/* eslint-disable no-mixed-requires */

'use strict';

const assert = require('assertthat'),
      Route = require('../../lib/routes');

suite('routes', () => {
  let route = null;

  test('should create route and export it correctly', done => {
    route = new Route();
    route.addToAllMethod('/allMethodCheck');
    route.addToGetMethodList('/checkGet');
    route.addToPostMethodList('/checkPost');
    route.addToPutMethodList('/checkPut');
    route.addToDeleteMethodList('/checkDelete');
    route.addToPatchMethodList('/checkPatch');
    assert.that(route.export()).is.equalTo({
      get: [ '/allMethodCheck', '/checkGet' ],
      post: [ '/allMethodCheck', '/checkPost' ],
      put: [ '/allMethodCheck', '/checkPut' ],
      delete: [ '/allMethodCheck', '/checkDelete' ],
      patch: [ '/allMethodCheck', '/checkPatch' ]
    });

    done();
  });

  test('should create route using processEndpoint interface', done => {
    route = new Route();
    const endpointConfig = {
      get: [ '/checkGet' ],
      post: [ '/checkPost' ],
      put: [ '/checkPut' ],
      delete: [ '/checkDelete' ],
      patch: [ '/checkPatch' ]
    };

    Object.keys(endpointConfig).forEach(method => {
      endpointConfig[method].forEach(path => {
        route.processEndpoint(method, path);
      });
    });
    assert.that(route.export()).is.equalTo(endpointConfig);
    done();
  });
});


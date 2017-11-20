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
    routes.addToGetMethodList('/checkGet');
    routes.addToPostMethodList('/checkPost');
    routes.addToPutMethodList('/checkPut');
    routes.addToDeleteMethodList('/checkDelete');
    routes.addToPatchMethodList('/checkPatch');
    assert.that(routes.export()).is.equalTo({
      get: [ '/allMethodCheck', '/checkGet' ],
      post: [ '/allMethodCheck', '/checkPost' ],
      put: [ '/allMethodCheck', '/checkPut' ],
      delete: [ '/allMethodCheck', '/checkDelete' ],
      patch: [ '/allMethodCheck', '/checkPatch' ]
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
    assert.that(routes.export()).is.equalTo(endpointConfig);
    done();
  });
});


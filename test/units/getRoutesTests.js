'use strict';

const assert = require('assertthat'),
      express = require('express');

let getRoutes;

suite('getRoutes', () => {
  let app;

  setup(() => {
      /* eslint-disable prefer-reflect */
    delete require.cache[require.resolve('../../lib/Routes')];
      /* eslint-enable prefer-reflect */
        /* eslint-disable global-require */
    getRoutes = require('../../lib/getRoutes');
        /* eslint-enable global-require */

    app = express();

    app.get('/articles', () => {
            // Intentionally left blank.
    });
    app.post('/articles/:id', () => {
            // Intentionally left blank.
    });
  });
  teardown(() => {
        /* eslint-disable prefer-reflect */
    delete require.cache[require.resolve('../../lib/getRoutes')];
        /* eslint-enable prefer-reflect */
  });
  test('is a function.', done => {
    assert.that(getRoutes).is.ofType('function');
    done();
  });

  test('throws an error if app is missing.', done => {
    assert.that(() => {
      getRoutes();
    }).is.throwing('App is missing.');
    done();
  });

  test('throws an error if app is not supported.', done => {
    assert.that(() => {
      getRoutes({});
    }).is.throwing('App is not supported.');
    done();
  });

  test('returns a list of routes.', done => {
    const routes = getRoutes(app);

    assert.that(routes).is.equalTo({
      get: [
        '/articles'
      ],
      post: [
        '/articles/:id'
      ],
      put: [],
      patch: [],
      delete: []
    });
    done();
  });
});

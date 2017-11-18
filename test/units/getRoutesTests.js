'use strict';

const assert = require('assertthat'),
      express = require('express');

const getRoutes = require('../../lib/getRoutes');

suite('getRoutes', () => {
  let app;

  setup(() => {
    app = express();

    app.get('/articles', () => {
      // Intentionally left blank.
    });
    app.post('/articles/:id', () => {
      // Intentionally left blank.
    });
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
      ]
    });
    done();
  });
});

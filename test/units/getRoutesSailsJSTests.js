/* eslint-disable no-empty-function,no-console */

'use strict';

const assert = require('assertthat');

const getRoutes = require('../../lib/getRoutes');

suite('getRoutes\t Sails.js', () => {
  let app;

  setup(() => {
    const Sails = function () {
      this.config = {
        routes: {
          '/': {},
          'get /articles': {
            view: 'somewhere'
          },
          'post /articles/:id': {
            controller: 'something'
          }

        }
      };
    };

    app = new Sails();
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

  test('returns a list of routes.', done => {
    const routes = getRoutes(app);

    assert.that(routes).is.equalTo({
      get: [
        '/',
        '/articles'
      ],
      delete: [
        '/'
      ],
      patch: [
        '/'
      ],
      post: [
        '/',
        '/articles/:id'
      ],
      put: [
        '/'
      ]
    });
    done();
  });
});

'use strict';

const assert = require('assertthat'),
      express = require('express'),
      sails = require('sails');

const getRoutes = require('../../lib/getRoutes'),
      sailsConfiguration = require('../helpers/sailsConfiguration');

suite('getRoutes', () => {
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
    }).is.throwing('Invalid application type.');
    done();
  });

  suite('for Express apps', () => {
    test('returns a list of routes.', done => {
      const app = express();

      app.get('/articles', () => {
        // Intentionally left blank.
      });
      app.post('/articles/:id', () => {
        // Intentionally left blank.
      });

      const routes = getRoutes(app);

      assert.that(routes).is.equalTo({
        get: [ '/articles' ],
        post: [ '/articles/:id' ],
        put: [],
        patch: [],
        delete: []
      });

      done();
    });
  });

  suite('for Sails.js apps', () => {
    test('returns a list of routes.', done => {
      sails.lift(sailsConfiguration, err => {
        if (err) {
          return done(err);
        }

        const routes = getRoutes(sails);

        assert.that(routes).is.equalTo({
          get: [ '/csrfToken', '/' ],
          post: [ '/csrfToken', '/' ],
          put: [ '/csrfToken', '/' ],
          patch: [ '/csrfToken', '/' ],
          delete: [ '/csrfToken', '/' ]
        });

        sails.lower(errSails => {
          if (errSails) {
            return done(errSails);
          }

          done();
        });
      });
    });
  });
});

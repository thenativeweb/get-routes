'use strict';

const assert = require('assertthat');
const sails = require('sails');
const getRoutes = require('../../lib/getRoutes');
const config = require('../resource/sailsTestConfig');

suite('getRoutes Sails.js', () => {
  suiteSetup(function (done) {
        // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);
    process.NODE_ENV = 'test';
    sails.lift(config, err => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  suiteTeardown(done => {
        // here you can clear fixtures, etc.
    sails.lower(done);
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
    const routes = getRoutes(sails);

    assert.that(routes).is.equalTo({
      get: [
        '/csrfToken',
        '/'
      ],
      post: [
        '/csrfToken',
        '/'
      ],
      put: [
        '/csrfToken',
        '/'
      ],
      patch: [
        '/csrfToken',
        '/'
      ],
      delete: [
        '/csrfToken',
        '/'
      ]
    });
    done();
  });
});

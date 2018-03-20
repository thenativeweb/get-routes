'use strict';

const assert = require('assertthat');
const Sails = require('sails').Sails;
let getRoutes;
const config = require('../resource/sailsTestConfig');
let sails = null;

suite('getRoutes Sails.js', () => {
  suiteSetup(function (done) {
        // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);
    process.NODE_ENV = 'test';
    sails = new Sails();
    sails.lift(config, err => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  setup(() => {
      /* eslint-disable global-require */
    getRoutes = require('../../lib/getRoutes');
      /* eslint-enable global-require */
  });
  teardown(() => {
        /* eslint-disable prefer-reflect */
    delete require.cache[require.resolve('../../lib/getRoutes')];
        /* eslint-enable prefer-reflect */
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

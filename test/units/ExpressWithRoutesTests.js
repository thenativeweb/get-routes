'use strict';

const assert = require('assertthat'),
      express = require('express');
const Router = express.Router;

const getRoutes = require('../../lib/getRoutes');

suite('Get routes from express app that use Routes as middleware.', () => {
  test('get routes from express app. In Human Readable URL forms.', done => {
    const app = express();
    const routerLevel1 = new Router(),
          routerLevel2 = new Router();
    const nestedRouter = new Router();

        // Simple route.
    app.get('/', (req, res) => {
      res.send();
    });

        // First level router.
    routerLevel1.delete('/test', (req, res) => {
      res.send();
    });
    app.use('/level1', routerLevel1);

        // Second level router.
    nestedRouter.post('/nested(/:test)', (req, res) => res.send());

        // Nested router.
    routerLevel2.use('/(:inPathParam)/level2/:param2', nestedRouter);

    app.use('/topLevel', routerLevel2);

    const routes = getRoutes(app);

    assert.that(routes).is.equalTo({
      get: [
        '/'
      ],
      post: [
        '/topLevel/(:inPathParam)/level2/:param2/nested(/:test)'
      ],
      put: [],
      patch: [],
      delete: [
        '/level1/test'
      ]
    });
    done();
  });
  test('get routes from express app. In RegexURL forms.', done => {
    const app = express();
    const routerLevel1 = new Router(),
          routerLevel2 = new Router();
    const nestedRouter = new Router();

        // Simple route.
    app.get('/', (req, res) => {
      res.send();
    });

        // First level router.
    routerLevel1.delete('/test', (req, res) => {
      res.send();
    });
    app.use('/level1', routerLevel1);

        // Second level router.
    nestedRouter.post('/nested/(:test)', (req, res) => res.send());

        // Nested router.
    routerLevel2.use('/(:inPathParam)/level2/:param2', nestedRouter);

    app.use('/topLevel', routerLevel2);

    const routes = getRoutes(app, { format: 'human-readable' });

    assert.that(routes).is.equalTo({
      get: [
        '/'
      ],
      post: [
        '/topLevel/(:inPathParam)/level2/:param2/nested/(:test)'
      ],
      put: [],
      patch: [],
      delete: [
        '/level1/test'
      ]
    });
    done();
  });
});

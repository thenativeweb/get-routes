import assert from 'assertthat';
import express from 'express';
import getRoutes from '../../lib/getRoutes';

const dummyCtrl = (): void => {
  // Intentionally left blank.
};

suite('getRoutes', (): void => {
  test('returns a list of routes.', async (): Promise<void> => {
    const app = express();

    app.get('/articles', dummyCtrl);
    app.post('/articles/:id', dummyCtrl);

    const routes = getRoutes(app);

    assert.that(routes).is.equalTo({
      get: [ '/articles' ],
      post: [ '/articles/:id' ],
      put: [],
      patch: [],
      delete: []
    });
  });

  test('return a list of nested routes.', async (): Promise<void> => {
    const app = express();
    /* eslint-disable new-cap */
    const userDummyRouter = express.Router();
    const categoryDummyRouter = express.Router();
    const nestedInCategoryRoute = express.Router();
    /* eslint-enable new-cap */

    userDummyRouter.get('/:id', dummyCtrl);
    userDummyRouter.put('/:id', dummyCtrl);
    userDummyRouter.post('/', dummyCtrl);

    categoryDummyRouter.get('/', dummyCtrl);
    categoryDummyRouter.get('/:id', dummyCtrl);
    categoryDummyRouter.post('/', dummyCtrl);
    nestedInCategoryRoute.get('/test', dummyCtrl);
    categoryDummyRouter.use(nestedInCategoryRoute);

    app.use('/user', userDummyRouter);
    app.use('/category', categoryDummyRouter);
    app.get('/load-balancer', dummyCtrl);

    const routes = getRoutes(app);

    assert.that(routes).is.equalTo({
      get: [
        '/load-balancer',
        '/user/:id',
        '/category/',
        '/category/:id',
        '/category/test'
      ],
      post: [
        '/user/',
        '/category/'
      ],
      put: [
        '/user/:id'
      ],
      patch: [],
      delete: []
    });
  });
});

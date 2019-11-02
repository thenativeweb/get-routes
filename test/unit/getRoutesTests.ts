import assert from 'assertthat';
import express from 'express';
import getRoutes from '../../lib/getRoutes';

suite('getRoutes', (): void => {
  test('returns a list of routes.', async (): Promise<void> => {
    const app = express();

    app.get('/articles', (): void => {
      // Intentionally left blank.
    });
    app.post('/articles/:id', (): void => {
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
  });
});

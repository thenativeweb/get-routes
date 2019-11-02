import { Application } from 'express';
import { forOwn } from 'lodash';
import { Routes } from './Routes';

const getRoutes = function (app: Application): Routes {
  const routes: Routes = {
    get: [],
    post: [],
    put: [],
    patch: [],
    delete: []
  };

  /* eslint-disable no-underscore-dangle */
  forOwn(app._router.stack, (middleware): void => {
    /* eslint-enable no-underscore-dangle */
    if (!middleware.route) {
      return;
    }

    const { method } = middleware.route.stack[0],
          { path } = middleware.route;

    switch (method) {
      case 'get':
        routes.get.push(path);
        break;
      case 'post':
        routes.post.push(path);
        break;
      case 'put':
        routes.put.push(path);
        break;
      case 'patch':
        routes.patch.push(path);
        break;
      case 'delete':
        routes.delete.push(path);
        break;
      default:
        throw new Error(`Invalid method ${method}.`);
    }
  });

  return routes;
};

export default getRoutes;

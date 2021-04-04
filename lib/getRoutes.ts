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

  const processMiddleware = (middleware: any): void => {
    if (middleware.name === 'router' && middleware.handle.stack) {
      forOwn(middleware.handle.stack, processMiddleware);
    }

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
  };

  // eslint-disable-next-line no-underscore-dangle
  forOwn(app._router.stack, processMiddleware);

  return routes;
};

export { getRoutes };

import { Application } from 'express';
import { cloneDeep } from 'lodash';
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
  const expressRouterStack: any[] = app._router.stack;
  /* eslint-enable no-underscore-dangle */
  const parseRoute = (middleware: any, prePath: string): void => {
    if (!middleware.route) {
      return;
    }

    const { method } = middleware.route.stack[0],
          path = prePath + (middleware.route.path as string);

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
  const extractNestedExpressRouter = (stack: any[], prePath: string): void => {
    // Load simple one
    if (!Array.isArray(stack)) {
      throw new Error('Stack is not an Array.');
    }
    stack.filter((middleware: any): boolean => middleware.route).forEach((middleware: any): void => {
      parseRoute(middleware, prePath);
    });
    stack.filter((middleware: any): boolean => middleware.name === 'router').map((middleware: any): any => {
      const tmp = cloneDeep(middleware);

      tmp.handle.stack.forEach((route: any): void => {
        route.keys.forEach((param: any): void => {
          const rawStrURL = route.regexp.toString();

          // eslint-disable-next-line no-param-reassign
          route.regexp = rawStrURL.
            replace('(?:([^\\/]+?))', `/:${param.name}`);
        });
      });

      return tmp;
    }).
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      forEach((middleware: any): void => extractNestedExpressRouter(middleware.handle.stack, prePath + middleware.regexp.
        toString().
        replace('/^\\/?(?=\\/|$)/i', '').
        replace('\\/?(?=\\/|$)/i', '').
        replace('/^\\', '')));
  };

  extractNestedExpressRouter(expressRouterStack, '');

  return routes;
};

export default getRoutes;

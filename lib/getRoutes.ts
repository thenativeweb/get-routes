import { Application } from 'express';
import { Routes } from './Routes';

// Disable naming convention because fast_slash comes from express
// eslint-disable-next-line @typescript-eslint/naming-convention
const regexPrefixToString = (path: { fast_slash: any; toString: () => string }): string => {
  if (path.fast_slash) {
    return '';
  }
  const match = /^\/\^((?:\\[$()*+./?[\\\]^{|}]|[^$()*+./?[\\\]^{|}])*)\$\//u.exec(
    path.toString().replace('\\/?', '').replace('(?=\\/|$)', '$')
  );

  if (match) {
    // Unescape characters
    return match[1].replace(/\\(.)/gu, '$1');
  }

  return '[Unknown path]';
};

const getRoutes = function (app: Application): Routes {
  const routes: Routes = {
    get: [],
    post: [],
    put: [],
    patch: [],
    delete: []
  };

  const processMiddleware = (middleware: any, prefix = ''): void => {
    if (middleware.name === 'router' && middleware.handle.stack) {
      for (const subMiddleware of middleware.handle.stack) {
        processMiddleware(subMiddleware, `${prefix}${regexPrefixToString(middleware.regexp)}`);
      }
    }

    if (!middleware.route) {
      return;
    }

    const { method } = middleware.route.stack[0],
          { path } = middleware.route;

    switch (method) {
      case 'get':
        routes.get.push(`${prefix}${path}`);
        break;
      case 'post':
        routes.post.push(`${prefix}${path}`);
        break;
      case 'put':
        routes.put.push(`${prefix}${path}`);
        break;
      case 'patch':
        routes.patch.push(`${prefix}${path}`);
        break;
      case 'delete':
        routes.delete.push(`${prefix}${path}`);
        break;
      default:
        throw new Error(`Invalid method ${method}.`);
    }
  };

  // eslint-disable-next-line no-underscore-dangle
  for (const middleware of app._router.stack) {
    processMiddleware(middleware);
  }

  return routes;
};

export { getRoutes };

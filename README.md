# get-routes

get-routes gets all routes from an Express application.

## Status

| Category         | Status                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Version          | [![npm](https://img.shields.io/npm/v/get-routes)](https://www.npmjs.com/package/get-routes)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/get-routes)                                                                                   |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/get-routes)                                                                               |
| Build            | [![CircleCI](https://img.shields.io/circleci/build/github/thenativeweb/get-routes)](https://circleci.com/gh/thenativeweb/get-routes/tree/master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/get-routes)                                                                         |

## Installation

```shell
$ npm install get-routes
```

## Quick start

First you need to add a reference to get-routes to your application:

```javascript
const getRoutes = require('get-routes').default;
```

If you use TypeScript, use the following code instead:

```typescript
import getRoutes from 'get-routes';
```

Then, call the `getRoutes` function with an Express app to get a list of all registered routes:

```javascript
const routes = getRoutes(app);

console.log(routes);
// => {
//      get: [
//        '/articles'
//      ],
//      post: [
//        '/articles/:id'
//      ],
//      ...
//    }
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ npx roboter
```

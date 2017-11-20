'use strict';

/* eslint-disable no-underscore-dangle */
const _routes = new WeakMap();
/* eslint-enable no-underscore-dangle */

/* eslint-disable no-restricted-syntax */
class Routes {
/* eslint-enable no-restricted-syntax */
  constructor () {
    _routes.set(this, {});
  }
    /* eslint-disable class-methods-use-this */
  addToGetMethodList (path) {
    if (!_routes.get(this).get) {
      _routes.get(this).get = [];
    }
    _routes.get(this).get.push(path);
  }

  addToPostMethodList (path) {
    if (!_routes.get(this).post) {
      _routes.get(this).post = [];
    }
    _routes.get(this).post.push(path);
  }

  addToPutMethodList (path) {
    if (!_routes.get(this).put) {
      _routes.get(this).put = [];
    }
    _routes.get(this).put.push(path);
  }

  addToDeleteMethodList (path) {
    if (!_routes.get(this).delete) {
      _routes.get(this).delete = [];
    }
    _routes.get(this).delete.push(path);
  }

  addToPatchMethodList (path) {
    if (!_routes.get(this).patch) {
      _routes.get(this).patch = [];
    }
    _routes.get(this).patch.push(path);
  }

  addToAllMethod (path) {
    this.addToGetMethodList(path);
    this.addToDeleteMethodList(path);
    this.addToPatchMethodList(path);
    this.addToPostMethodList(path);
    this.addToPutMethodList(path);
  }

  processEndpoint (method, path) {
    switch (method.toLowerCase()) {
      case 'get':
        this.addToGetMethodList(path);
        break;
      case 'post':
        this.addToPostMethodList(path);
        break;
      case 'put':
        this.addToPutMethodList(path);
        break;
      case 'delete':
        this.addToDeleteMethodList(path);
        break;
      case 'patch':
        this.addToPatchMethodList(path);
        break;
      default:
        throw new Error('Method is not correct.');
    }
  }

  export () {
    return _routes.get(this);
  }
    /* eslint-enable class-methods-use-this */
}

module.exports = Routes;

'use strict';

const supportedMethods = [ 'get', 'post', 'put', 'patch', 'delete' ];

const routes = {
  data: {},

  addTo (method, path) {
    if (!method) {
      throw new Error('Method is missing.');
    }
    if (!path) {
      throw new Error('Path is missing.');
    }

    if (!supportedMethods.includes(method)) {
      throw new Error('Method is not supported.');
    }

    this.data[method] = this.data[method] || [];

    if (this.data[method][path]) {
      throw new Error('A route with this method and path had already been added.');
    }

    this.data[method].push(path);
  },

  addToAllMethod (path) {
    if (!path) {
      throw new Error('Path is missing.');
    }

    supportedMethods.forEach(method => {
      this.addTo(method, path);
    });
  }
};

module.exports = routes;

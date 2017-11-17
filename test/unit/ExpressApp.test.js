'use strict';

const getRoute = require('../../lib/getRoutes');
const should = require('should');

describe('# test module for Express environment', () => {
  it('should find 1 route on an express app', () => {
    let mockExpress = {
      _router: {
        stack: [
          {},// not route middleware
          {
            route: {
              stack: [{method: 'get'}],
              path: '/checkExpress'
            }
          }
        ]
      }
    }
    getRoute(mockExpress)
      .should.have.properties({get: ['/checkExpress']})


  });
})

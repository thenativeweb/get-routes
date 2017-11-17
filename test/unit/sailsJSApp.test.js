const should = require('should');
const getRoute = require('../../lib/getRoutes')

describe('# test module for Sails.JS environment', () => {
  it('should find 2 route on an sails.js app', () => {
    class Sails {

      get config() {
        return {
          routes: {
            '/allMethod': {
              view: 'somewhere'
            },
            'get /aGetEndpoint': {
              controller: 'something'
            }

          }
        }
      }
    }
    let mockSails = new Sails();
    getRoute(mockSails)
      .should.have.properties({
      get: ['/allMethod', '/aGetEndpoint'],
      post: ['/allMethod'],
      put: ['/allMethod'],
      delete: ['/allMethod'],
      patch: ['/allMethod']
    })


  });
})

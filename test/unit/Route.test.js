const should = require('should');
const Route = require('../../lib/routes');

describe('# test Route Object', () => {
    let route = null;
    beforeEach(() => {
        route = new Route();
    })
    afterEach(() => {
        route = null;
    })
    it('should create route and export it correctly', () => {
        route.addToAllMethod('/allMethodCheck');
        route.addToGetMethodList('/checkGet');
        route.addToPostMethodList('/checkPost');
        route.addToPutMethodList('/checkPut');
        route.addToDeleteMethodList('/checkDelete');
        route.addToPatchMethodList('/checkPatch');
        route.export().should.have.properties({
            get: ['/allMethodCheck', '/checkGet'],
            post: ['/allMethodCheck', '/checkPost'],
            put: ['/allMethodCheck', '/checkPut'],
            delete: ['/allMethodCheck', '/checkDelete'],
            patch: ['/allMethodCheck', '/checkPatch']
        });
    });
    it('should create route using processEndpoint interface', () => {
        const endpointConfig = {
            get: ['/checkGet'],
            post: ['/checkPost'],
            put: ['/checkPut'],
            delete: ['/checkDelete'],
            patch: ['/checkPatch']
        };

        Object.keys(endpointConfig).forEach(method => {
            endpointConfig[method].forEach(path => {
                route.processEndpoint(method, path);
            })
        })
        route.export().should.have.properties(endpointConfig);
    })
})
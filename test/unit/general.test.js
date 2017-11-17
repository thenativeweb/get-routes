const should = require('should');
const getRoute = require('../../lib/getRoutes')
describe('#general test on getRoutes library', () => {
  it('should throw app required error', () => {
    let error = null;
    try {
      getRoute();
    }
    catch (err) {
      error = err;
    }
    error.should.have.properties({message: 'App is missing.'});

  })
  it('should throw unknown app error', () => {
    let error = null;
    try {
      getRoute({});
    }
    catch (err) {
      error = err;
    }
    error.should.have.properties({message: 'App is not supported.'})


  })
})

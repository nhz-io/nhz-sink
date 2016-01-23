jest.dontMock('../Connection.es6');
const Connection = require('../Connection.es6').default;
describe('Connection', function() {
  it('should be a class', function() {
    expect((new Connection) instanceof Connection).toBe(true);
  })
});

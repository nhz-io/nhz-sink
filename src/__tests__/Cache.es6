jest.dontMock('../Cache.es6');
const Cache = require('../Cache.es6').default;
describe('Cache', function() {
  it('should be a class', function() {
    expect(typeof Cache).toBe('function');
    expect((new Cache) instanceof Cache).toBe(true);
  })
});

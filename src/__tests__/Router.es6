jest.dontMock('../Router.es6');
const Router = require('../Router.es6').default;
describe('Router', function() {
  it('should be a class', function() {
    expect(typeof Router).toBe('function');
    expect((new Router) instanceof Router).toBe(true);
  })
});

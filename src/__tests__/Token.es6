jest.dontMock('../Token.es6');
const Token = require('../Token.es6').default;
describe('Token', function() {
  it('should be a class', function() {
    expect(typeof Token).toBe('function');
    expect((new Token) instanceof Token).toBe(true);
  })
});

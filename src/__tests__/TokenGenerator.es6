jest.dontMock('../TokenGenerator.es6');
const TokenGenerator = require('../TokenGenerator.es6').default;
describe('TokenGenerator', function() {
  it('should be a class', function() {
    expect(typeof TokenGenerator).toBe('function');
    expect((new TokenGenerator) instanceof TokenGenerator).toBe(true);
  })
});

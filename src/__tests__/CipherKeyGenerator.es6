jest.dontMock('../CipherKeyGenerator.es6');
const CipherKeyGenerator = require('../CipherKeyGenerator.es6').default;
describe('CipherKeyGenerator', function() {
  it('should be a class', function() {
    expect(typeof CipherKeyGenerator).toBe('function');
    expect((new CipherKeyGenerator) instanceof CipherKeyGenerator).toBe(true);
  })
});

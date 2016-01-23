jest.dontMock('../CipherKey.es6');
const CipherKey = require('../CipherKey.es6').default;
describe('CipherKey', function() {
  it('should be a class', function() {
    expect((new CipherKey) instanceof CipherKey).toBe(true);
  })
});

jest.dontMock('../Cipher.es6');
const Cipher = require('../Cipher.es6').default;
describe('Cipher', function() {
  it('should be a class', function() {
    expect((new Cipher) instanceof Cipher).toBe(true);
  })
});

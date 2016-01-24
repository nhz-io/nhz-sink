jest.dontMock('../PrivateKey.es6');
const PrivateKey = require('../PrivateKey.es6').default;
describe('PrivateKey', function() {
  it('should be a class', function() {
    expect(typeof PrivateKey).toBe('function');
    expect((new PrivateKey) instanceof PrivateKey).toBe(true);
  })
});

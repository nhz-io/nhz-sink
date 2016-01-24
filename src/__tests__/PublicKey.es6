jest.dontMock('../PublicKey.es6');
const PublicKey = require('../PublicKey.es6').default;
describe('PublicKey', function() {
  it('should be a class', function() {
    expect(typeof PublicKey).toBe('function');
    expect((new PublicKey) instanceof PublicKey).toBe(true);
  });
  it('should have isValid() static method', function() {
    expect(typeof PublicKey.isValid).toBe('function');
  });
});

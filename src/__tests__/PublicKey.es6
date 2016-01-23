jest.dontMock('../PublicKey.es6');
const PublicKey = require('../PublicKey.es6').default;
describe('PublicKey', function() {
  it('should be a class', function() {
    expect((new PublicKey) instanceof PublicKey).toBe(true);
  })
});

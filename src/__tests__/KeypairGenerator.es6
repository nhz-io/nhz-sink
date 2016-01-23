jest.dontMock('../KeypairGenerator.es6');
const KeypairGenerator = require('../KeypairGenerator.es6').default;
describe('KeypairGenerator', function() {
  it('should be a class', function() {
    expect((new KeypairGenerator) instanceof KeypairGenerator).toBe(true);
  })
});

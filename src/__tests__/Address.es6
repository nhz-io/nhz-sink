jest.dontMock('../Address.es6');
const Address = require('../Address.es6').default;
describe('Address', function() {
  it('should be a class', function() {
    expect(typeof Address).toBe('function');
    expect((new Address) instanceof Address).toBe(true);
  })
});

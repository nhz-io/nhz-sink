jest.dontMock('../Ledger.es6');
const Ledger = require('../Ledger.es6').default;
describe('Ledger', function() {
  it('should be a class', function() {
    expect((new Ledger) instanceof Ledger).toBe(true);
  })
});

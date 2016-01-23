jest.dontMock('../TokenTable.es6');
const TokenTable = require('../TokenTable.es6').default;
describe('TokenTable', function() {
  it('should be a class', function() {
    expect((new TokenTable) instanceof TokenTable).toBe(true);
  })
});

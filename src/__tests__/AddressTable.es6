jest.dontMock('../AddressTable.es6');
const AddressTable = require('../AddressTable.es6').default;
describe('AddressTable', function() {
  it('should be a class', function() {
    expect((new AddressTable) instanceof AddressTable).toBe(true);
  })
})

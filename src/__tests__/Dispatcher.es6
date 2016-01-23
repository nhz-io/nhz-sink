jest.dontMock('../Dispatcher.es6');
const Dispatcher = require('../Dispatcher.es6').default;
describe('Dispatcher', function() {
  it('should be a class', function() {
    expect((new Dispatcher) instanceof Dispatcher).toBe(true);
  })
});

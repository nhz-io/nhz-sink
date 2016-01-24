jest.dontMock('../Queue.es6');
const Queue = require('../Queue.es6').default;
describe('Queue', function() {
  it('should be a class', function() {
    expect(typeof Queue).toBe('function');
    expect((new Queue) instanceof Queue).toBe(true);
  })
});

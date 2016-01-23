jest.dontMock('../Channel.es6');
const Channel = require('../Channel.es6').default;
describe('Channel', function() {
  it('should be a class', function() {
    expect((new Channel) instanceof Channel).toBe(true);
  })
});

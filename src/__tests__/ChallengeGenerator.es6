jest.dontMock('../ChallengeGenerator.es6');
const ChallengeGenerator = require('../ChallengeGenerator.es6').default;
describe('ChallengeGenerator', function() {
  it('should be a class', function() {
    expect(typeof ChallengeGenerator).toBe('function');
    expect((new ChallengeGenerator) instanceof ChallengeGenerator).toBe(true);
  })
});

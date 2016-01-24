jest.dontMock('../PublicKey.es6');
const PublicKey = require('../PublicKey.es6').default;

const validLowerCase = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
const validUpperCase = '9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08';
const validMixedCase = '9f86D081884c7D659a2FEaa0c55aD015a3bf4f1b2b0B822CD15d6c15B0F00a08';
const invalidShort   = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a0';
const invalidLong    = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08f';
const invalidChars   = '9&86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

describe('PublicKey', function() {
  it('should be a class', function() {
    expect(typeof PublicKey).toBe('function');
    expect((new PublicKey) instanceof PublicKey).toBe(true);
  });
  it('should have isValid(publicKey) static method', function() {
    expect(typeof PublicKey.isValid).toBe('function');
  });

  describe('isValid(publicKey)', function() {
    it('should return true for valid keys', function() {
      expect(PublicKey.isValid(validLowerCase)).toBe(true);
      expect(PublicKey.isValid(validUpperCase)).toBe(true);
      expect(PublicKey.isValid(validLowerCase)).toBe(true);
    });

    it('should return false for invalid keys', function() {
      expect(PublicKey.isValid(invalidShort)).toBe(false);
      expect(PublicKey.isValid(invalidLong)).toBe(false);
      expect(PublicKey.isValid(invalidChars)).toBe(false);
    });
  })
});

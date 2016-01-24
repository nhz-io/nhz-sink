jest.dontMock('../Address.es6');

const publicKey = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
const PublicKey = jest.genMockFromModule('../PublicKey.es6')

const config = { shortAddressLength:10 };
jest.setMock('config', config);

describe('Address', function() {
  var address, Address;
  beforeEach(function() {
    PublicKey.isValid = function() { return true }
    jest.setMock('../PublicKey.es6', PublicKey);
    Address = require('../Address.es6').default;
    address = new Address(publicKey);
  });

  it('should be a class', function() {
    expect(typeof Address).toBe('function');
    expect(address instanceof Address).toBe(true);
  });

  it('should have a #full() method', function() {
    expect(typeof address.full).toBe('function');
  });

  it('should have a #short() method', function() {
    expect(typeof address.short).toBe('function');
  });

  describe('#constructor(publicKey)', function() {
    it('should throw when publicKey is invalid', function() {
      PublicKey.isValid = function() { return false }
      jest.setMock('../PublicKey.es6', PublicKey);
      Address = require('../Address.es6').default;
      expect(function() { new Address }).toThrow();
    });
  });

  describe('#short(length)', function() {
    it(
      'should return the short address with length of config.shortAddressLength',
      function() {
        var short = address.short();
        expect(short.length).toBe(config.shortAddressLength);
        expect(short).toBe(publicKey.substr(0, config.shortAddressLength));
      }
    );

    it(
      'should return the short address with length equal to first argument',
      function() {
        var short = address.short(15);
        expect(short.length).toBe(15);
        expect(short).toBe(publicKey.substr(0, 15));
      }
    );
  });

  describe('#full()', function() {
    it('should return the full address', function() {
      expect(address.full()).toBe(publicKey)
    });
  });
});

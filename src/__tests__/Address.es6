jest.dontMock('../Address.es6');
jest.dontMock('../../config/dist.es6');

var publicKey = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
const PublicKey = jest.genMockFromModule('../PublicKey.es6')

const config = { shortAddressLength: 10 }

describe('Address', function() {
  var address, Address;
  beforeEach(function() {
    PublicKey.isValid = function() { return true }
    config.shortAddressLength = 10;
    config.lowercaseAddress = undefined;
    jest.setMock('../../config/dist.es6', config);
    jest.setMock('../PublicKey.es6', PublicKey);
    Address = require('../Address.es6').default;
    address = new Address(publicKey);
    publicKey = address.publicKey;
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

    it('should normalize the publicKey to uppercase by default', function() {
      const lowercase = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
      address = new Address(lowercase);
      expect(address.publicKey.match(/[a-f]/)).toBe(null);
    });

    it('should normalize the publicKey to uppercase if lowercaseAddress is not true', function() {
      const lowercase = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
      config.lowercaseAddress = false;
      Address = require('../Address.es6').default;
      address = new Address(lowercase);
      expect(address.publicKey.match(/[a-f]/)).toBe(null);

      config.lowercaseAddress = null;
      Address = require('../Address.es6').default;
      address = new Address(lowercase);
      expect(address.publicKey.match(/[a-f]/)).toBe(null);

      config.lowercaseAddress = undefined;
      Address = require('../Address.es6').default;
      address = new Address(lowercase);
      expect(address.publicKey.match(/[a-f]/)).toBe(null);
    });

    it('should normalize the publicKey to lowercase', function() {
      const uppercase = '9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08';
      config.lowercaseAddress = true;
      Address = require('../Address.es6').default;
      address = new Address(uppercase);
      expect(address.publicKey.match(/[A-F]/)).toBe(null);
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

  describe('isValidShort(addressString)', function() {
    it(
      'should return true if addressString is valid short address',
      function() {
        const addressString = publicKey.substr(0, config.shortAddressLength);
        expect(Address.isValidShort(addressString)).toBe(true);
      }
    );

    it(
      'should return false if addressString is invalid short address',
      function() {
        const invalidLong = publicKey.substr(0, config.shortAddressLength + 1);
        const invalidShort = publicKey.substr(0, config.shortAddressLength - 1);
        const invalidChar = '%' + publicKey.substr(0, config.shortAddressLength - 1);
        expect(Address.isValidShort(invalidLong)).toBe(false);
        expect(Address.isValidShort(invalidShort)).toBe(false);
        expect(Address.isValidShort(invalidChar)).toBe(false);
      }
    );
  });

  describe('isValidFull(addressString)', function() {
    it(
      'should return true if addressString is valid full address',
      function() {
        PublicKey.isValid = function() { return true }
        jest.setMock('../PublicKey.es6', PublicKey);
        Address = require('../Address.es6').default;
        expect(Address.isValidFull(publicKey)).toBe(true);
      }
    );

    it(
      'should return false if addressString is invalid full address',
      function() {
        PublicKey.isValid = function() { return false }
        jest.setMock('../PublicKey.es6', PublicKey);
        Address = require('../Address.es6').default;
        expect(Address.isValidFull(publicKey)).toBe(false);
      }
    );
  });

  describe('isValid(addressString)', function() {
    it(
      'should return true if addressString is either valid short or full address',
      function() {
        PublicKey.isValid = function() { return true }
        jest.setMock('../PublicKey.es6', PublicKey);
        Address = require('../Address.es6').default;
        const validShort = publicKey.substr(0, config.shortAddressLength);
        expect(Address.isValid(validShort)).toBe(true);
        expect(Address.isValid(publicKey)).toBe(true);
      }
    );

    it(
      'should return false if addressString is neither valid short nor full address',
      function() {
        PublicKey.isValid = function() { return false }
        jest.setMock('../PublicKey.es6', PublicKey);
        Address = require('../Address.es6').default;
        const invalidLong = publicKey.substr(0, config.shortAddressLength + 1);
        const invalidShort = publicKey.substr(0, config.shortAddressLength - 1);
        const invalidChar = '%' + publicKey.substr(0, config.shortAddressLength - 1);
        expect(Address.isValid(invalidLong)).toBe(false);
        expect(Address.isValid(invalidShort)).toBe(false);
        expect(Address.isValid(invalidChar)).toBe(false);
        expect(Address.isValid(publicKey)).toBe(false);
      }
    );
  });
});

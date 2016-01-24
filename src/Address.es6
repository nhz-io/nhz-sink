import config from 'config';
import PublicKey from './PublicKey.es6';

export default class Address {
  static isValidShort(addressString) {
    return(
      addressString &&
      addressString.length == config.shortAddressLength &&
      addressString.match(/^[0-9a-f]+$/i)
      ? true
      : false
    )
  }

  static isValidFull(addressString) {
    return PublicKey.isValid(addressString)
  }

  static isValid(addressString) {
    return Address.isValidShort(addressString) || Address.isValidFull(addressString)
  }

  constructor(publicKey) {
    if (!PublicKey.isValid(publicKey)) {
      throw new Error(`Invalid public key: ${publicKey}`);
    }

    const value = config.lowercaseAddress
                    ? publicKey.toLowerCase()
                    : publicKey.toUpperCase();

    Object.defineProperty(this, 'publicKey', {
      enumerable: true, value: value
    });
  }

  full() { return this.publicKey }

  short(length = (config.shortAddressLength || 7)) {
    return this.publicKey.substr(0, length)
  }
}

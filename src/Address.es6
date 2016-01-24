import config from 'config';
import PublicKey from './PublicKey.es6';

export default class Address {
  constructor(publicKey) {
    if(!PublicKey.isValid(publicKey)) {
      throw new Error(`Invalid public key: ${publicKey}`);
    }
    Object.defineProperty(this, 'publicKey', {
      enumerable: true, value: publicKey
    });
  }

  full() { return this.publicKey }

  short(length = (config.shortAddressLength || 7)) {
    return this.publicKey.substr(0, length)
  }

  static isValidShort(addressString) {
    return(
      addressString &&
      addressString.length == config.shortAddressLength &&
      addressString.match(/^[0-9a-f]$/i)
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
}

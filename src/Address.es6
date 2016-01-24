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
}

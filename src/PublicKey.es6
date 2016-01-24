export default class PublicKey {
  static isValid(publicKey) {
    return publicKey && publicKey.match(/^[0-9a-f]{64}$/i) ? true : false;
  }

  constructor(props) {

  }
}

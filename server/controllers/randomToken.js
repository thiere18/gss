const Crypto = require('crypto')

const randomToken = (size) => {
  return Crypto
  .randomBytes(size)
  .toString('base64')
    .slice(0, size)
}

module.exports = randomToken
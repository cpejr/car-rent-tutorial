const bcrypt = require("bcrypt");

class Encrypter {
  encrypt(value) {
    const saltRounds = 13;
    return bcrypt.hashSync(value, saltRounds);
  }
}

module.exports = Encrypter;

const bcrypt = require("bcrypt");

class Encrypter {
  encrypt(value) {
    const saltRounds = 13;
    return bcrypt.hashSync(value, saltRounds);
  }

  compare(value, hash) {
    return bcrypt.compareSync(value, hash);
  }
}

module.exports = Encrypter;

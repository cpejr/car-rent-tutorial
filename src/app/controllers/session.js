const jwt = require("jsonwebtoken");
const { default: validator } = require("validator");
const { User } = require("../models");
const Encrypter = require("../helpers/encrypter");

const encrypter = new Encrypter();

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const userOrNull = await User.findOne({ where: { email } });

    if (!userOrNull) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userOrNull;

    const passwordsMatch = encrypter.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  login,
};

const { default: validator } = require("validator");
const { cpf: cpfValidator } = require("cpf-cnpj-validator");
const { User } = require("../models");

async function create(req, res) {
  try {
    const {
      name,
      email,
      cpf,
      role,
      birthdate,
      password,
      password_confirmation: passwordConfirmation,
    } = req.body;

    if (passwordConfirmation !== password) {
      return res.status(400).json({ message: "Invalid password confirmation" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Weak password" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isValidDate = validator.isDate(birthdate, "DD/MM/YYYY");

    if (!isValidDate) {
      return res.status(400).json({ message: "Invalid birthdate" });
    }

    const [day, month, year] = birthdate.split("/");
    const sanitizedBirthdate = new Date(year, month, day);

    if (!cpfValidator.isValid(cpf)) {
      return res.status(400).json({ message: "Invalid cpf" });
    }

    if (!name || name.length < 3) {
      return res.status(400).json({ message: "Invalid name" });
    }

    const acceptableRoles = ["admin", "common"];
    if (!acceptableRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.create({
      name,
      email,
      cpf,
      role,
      sanitizedBirthdate,
      password,
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  create,
};

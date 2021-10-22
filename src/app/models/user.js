const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Encrypter = require("../helpers/encrypter");

const encrypter = new Encrypter();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: uuidv4(),
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      cpf: DataTypes.STRING,
      role: DataTypes.STRING,
      birthdate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options, callback) => {
    // eslint-disable-next-line no-param-reassign
    user.password = encrypter.encrypt(user.password);
  });

  return User;
};

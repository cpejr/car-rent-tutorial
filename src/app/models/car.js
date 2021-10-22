const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init(
    {
      model: DataTypes.STRING,
      brand: DataTypes.STRING,
      year: DataTypes.NUMBER,
      plate: DataTypes.STRING,
      dailyPrice: DataTypes.NUMBER,
      drivenKm: DataTypes.NUMBER,
      isRented: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};

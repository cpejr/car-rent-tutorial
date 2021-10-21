const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Car);
    }
  }
  Rent.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: DataTypes.NUMBER,
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );
  return Rent;
};

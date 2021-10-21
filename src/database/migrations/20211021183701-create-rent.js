module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "User",
          key: "id",
        },
      },
      carId: {
        type: Sequelize.UUID,
        references: {
          model: "Car",
          key: "id",
        },
      },
      total_price: {
        type: Sequelize.NUMBER,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Rents");
  },
};

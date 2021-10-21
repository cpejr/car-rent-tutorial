const sequelize = require("sequelize");
const { default: validator } = require("validator");
const { Car, Rent } = require("../models");

async function create(req, res) {
  try {
    const { user } = req;
    const { carId } = req.params;
    const { start_date: startDate } = req.body;

    if (startDate) {
      const isValidDate = validator.isDate(startDate, "DD/MM/YYYY");

      if (!isValidDate) {
        return res.status(400).json({ message: "Invalid start date" });
      }
    }

    const car = await Car.findOne(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.isRented) {
      return res.status(400).json({ message: "Car is already rented." });
    }

    const notFinishedUserRents = await Rent.findAll({
      where: {
        userId: user.id,
        endDate: null,
        startDate: { [sequelize.Op.not]: null },
      },
    });

    if (notFinishedUserRents.length > 0) {
      return res.status(400).json({ message: "User has unfinished rents" });
    }

    const rent = await Rent.create({
      userId: user.id,
      carId,
      startDate: startDate || new Date(),
    });

    return res.status(200).json({ rent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  create,
};

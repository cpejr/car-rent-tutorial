const { default: validator } = require("validator");
const { Car } = require("../models");

const MAX_CAR_AGE = 10;
const MAX_CAR_DRIVEN_KM = 60000;

async function create(req, res) {
  const {
    model,
    brand,
    year,
    plate,
    daily_price: dailyPrice,
    drivenKm,
  } = req.body;

  if (Number.isNaN(validator.toInt(year))) {
    return res.status(400).json({ message: "Invalid car year" });
  }

  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();

  if (year > nowYear) {
    return res
      .status(400)
      .json({ message: `Car year cannot be greater than ${nowYear}` });
  }

  if (nowYear - year > MAX_CAR_AGE) {
    return res.status(400).json({ message: "Car is older than permitted" });
  }

  if (Number.isNaN(validator.toFloat(drivenKm))) {
    return res.status(400).json({ message: "Invalid car driven kilometers" });
  }

  if (drivenKm > MAX_CAR_DRIVEN_KM) {
    return res
      .status(400)
      .json({ message: "Car has more driven kilometers than permitted" });
  }

  const car = await Car.create({
    model,
    brand,
    year,
    plate,
    dailyPrice,
    drivenKm,
  });

  return res.status(200).json({ car });
}

module.exports = { create };

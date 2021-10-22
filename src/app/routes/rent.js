const express = require("express");
const controller = require("../controllers/rent");
const { auth } = require("../middlewares/auth");

const routes = express.Router();

routes.post("/car/:carId", auth, controller.create);
routes.post("/end/car/:carId", auth, controller.end);

module.exports = routes;

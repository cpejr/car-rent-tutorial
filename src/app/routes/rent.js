const express = require("express");
const controller = require("../controllers/rent");

const routes = express.Router();

routes.post("/car/:carId", controller.create);

module.exports = routes;

const express = require("express");
const controller = require("../controllers/car");

const routes = express.Router();

routes.post("/", controller.create);

module.exports = routes;

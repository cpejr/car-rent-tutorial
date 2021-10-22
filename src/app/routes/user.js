const express = require("express");
const controller = require("../controllers/user");

const routes = express.Router();

routes.post("/", controller.create);

module.exports = routes;

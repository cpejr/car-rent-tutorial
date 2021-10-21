const routes = require("express").Router();

const userRoutes = require("./user");

routes.use("/users", userRoutes);

module.exports = routes;

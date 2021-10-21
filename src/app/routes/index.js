const routes = require("express").Router();

const userRoutes = require("./user");
const sessionRoutes = require("./session");
const rentRoutes = require("./rent");

routes.use("/users", userRoutes);
routes.use("/", sessionRoutes);
routes.use("/rent", rentRoutes);

module.exports = routes;

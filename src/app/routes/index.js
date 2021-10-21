const routes = require("express").Router();

const userRoutes = require("./user");
const sessionRoutes = require("./session");
const rentRoutes = require("./rent");
const carRoutes = require("./car");

routes.use("/users", userRoutes);
routes.use("/", sessionRoutes);
routes.use("/rent", rentRoutes);
routes.use("/car", carRoutes);

module.exports = routes;

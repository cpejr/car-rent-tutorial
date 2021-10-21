const routes = require("express").Router();

const userRoutes = require("./user");
const sessionRoutes = require("./session");

routes.use("/users", userRoutes);
routes.use("/", sessionRoutes);

module.exports = routes;

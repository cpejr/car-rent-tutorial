require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./app/routes");

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🔥 App is up and running on port ${PORT}`);
});

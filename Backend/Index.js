const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const DBConnection = require("./config/DB");

DBConnection();
const port = process.env.PORT || 8081;

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/api/user", require("./routes/User"));
app.use("/api/product", require("./routes/Product"));
app.use("/api/cart", require("./routes/Cart"));

app.listen(port, () => {
  console.log(`APP LISTEN ON PORT ${port} :)`);
});

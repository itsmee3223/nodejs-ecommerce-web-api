const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.options("*", cors());
// middleware
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is online",
  });
});

const apiURL = process.env.API_URL;
app.use(`${apiURL}/categories`, categoryRoutes);
app.use(`${apiURL}/products`, productRoutes);
app.use(`${apiURL}/users`, userRoutes);
app.use(`${apiURL}/orders`, orderRoutes);

module.exports = app;

const express = require("express");

const app = express();

app.use("/", (req, res) => {
  return res.status(200).json({
    message: "Server is online",
  });
});

module.exports = app;

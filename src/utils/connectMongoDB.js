const mongoose = require("mongoose");

const asyncHandler = require("../middlewares/asyncHandler");

const connectToMongoDB = asyncHandler(async () => {
  const connect = await mongoose.connect(process.env.CONNECTION_STRING_MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
  });

  console.log(`MongoDB connected to: ${connect.connection.host}`);
});

module.exports = connectToMongoDB;
